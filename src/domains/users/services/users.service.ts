import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@/domains/users/entities/user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IdType } from '@/common/types/id.type';
import { ICreateUser } from '@/domains/users/interfaces/create-user.interface';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserCreatedEvent } from '@/domains/users/events/user-created.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserEvent } from '@/domains/users/enums/user-event.enum';
import { SocialVendor } from '@/domains/users/enums/social-vendor.enum';
import { SocialsService } from '@/domains/users/services/socials.service';
import { CryptoUtilService } from '@/common/services/crypto-util.service';
import { IUpdateUser } from '@/domains/users/interfaces/update-user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
    private readonly eventEmitter: EventEmitter2,
    private readonly socialsService: SocialsService,
    private readonly cryptoUtilService: CryptoUtilService,
  ) {}

  public async getById(id: IdType): Promise<User> {
    return this.userRepository.findOneOrFail({ id });
  }

  public async hasAccountAccess(userId: IdType, accountId: IdType): Promise<boolean> {
    return !!(await this.userRepository.findOneOrFail({ id: userId, memberships: { account: { id: accountId } } }));
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ email }, { populate: ['memberships.account', 'memberships.role', 'socials'] });
  }

  public async getByEmail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({ email });
  }

  public async existByEmail(email: string): Promise<boolean> {
    return !!(await this.userRepository.count({ email }));
  }

  public async update(userId: IdType, options: IUpdateUser): Promise<void> {
    const user = await this.getById(userId);

    if (options?.password) {
      if (!options.oldPassword) throw new BadRequestException('Old password required.');

      const compared = await this.cryptoUtilService.verifyPasswordHash(options.oldPassword, String(user.password));

      if (!compared) throw new BadRequestException('Wrong old password.');

      user.password = await this.cryptoUtilService.generatePasswordHash(options.password);
    }

    user.nickname = options.nickname || user.nickname;
    user.firstName = options.firstName || '';
    user.lastName = options.lastName || '';

    await this.em.flush();
  }

  public async register(payload: ICreateUser): Promise<User> {
    const nickname = payload.nickname ? payload.nickname : payload.email.split('@')[0];

    const user = new User({ ...(payload as ICreateUser), nickname });

    await this.em.fork().persistAndFlush(user);

    const event = new UserCreatedEvent(user.id, nickname);
    this.eventEmitter.emit(UserEvent.Create, event);

    return user;
  }

  public async signInWithSocial(payload: {
    vendor: SocialVendor;
    sub: string;
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
  }): Promise<User> {
    const socialUser = await this.userRepository.findOne(
      { socials: { sub: payload.sub } },
      { populate: ['memberships.account', 'memberships.role', 'socials'] },
    );

    if (socialUser) return socialUser;

    if (!payload.email) throw new BadRequestException('Wrong social payload data.');

    const userByEmail = await this.findByEmail(payload.email);
    if (userByEmail) {
      await this.socialsService.save({
        user: userByEmail,
        sub: payload.sub,
        vendor: payload.vendor,
      });

      return userByEmail;
    }

    return await this.register({
      email: payload.email,
      nickname: payload.name,
      firstName: payload.firstName,
      lastName: payload.lastName,
    });
  }
}
