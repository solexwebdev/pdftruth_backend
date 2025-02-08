import { IEnquiryPayload } from '@/enquiries/interfaces/enqiury-payload.interface';

export interface ICORHandler<Request = IEnquiryPayload, Result = void> {
  setNext(handler: ICORHandler<Request, Result>): ICORHandler<Request, Result>;

  handle(request: Request): Result;
}
