import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Enquiry } from '@/enquiries/entities/enquiry.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { ICreateEnquiry } from '@/enquiries/interfaces/create-enquiry.interface';

@Injectable()
export class EnquiriesService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepository: EntityRepository<Enquiry>,
    private readonly em: EntityManager,
  ) {}

  public async save(payload: ICreateEnquiry): Promise<Enquiry> {
    const enquiry = new Enquiry({
      ...payload,
    });

    await this.em.persistAndFlush(enquiry);

    return enquiry;
  }
}
