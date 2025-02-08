import { ICORHandler } from '@/enquiries/interfaces/COR-handler.interface';
import { IEnquiryPayload } from '@/enquiries/interfaces/enqiury-payload.interface';

/**
 * The default chaining behavior can be implemented inside a base handler class.
 */
export class AbstractCORHandler implements ICORHandler {
  private nextHandler: ICORHandler;
  public setNext(handler: ICORHandler<IEnquiryPayload, void>): ICORHandler<IEnquiryPayload, void> {
    this.nextHandler = handler;

    return handler;
  }

  public async handle(request: IEnquiryPayload): Promise<void> {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return;
  }
}
