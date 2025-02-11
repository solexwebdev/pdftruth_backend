export interface IEnquiryAnnotation {
  annotationFlags: boolean;
  modificationDate: string;
  subtype: string;
}

export interface IEnquiryPageInfo {
  hasContentItems: boolean;
  annotations: IEnquiryAnnotation[];
}

export interface IEnquiryMetaData {
  metadata: Record<string, undefined> | null;
  info: Record<string, undefined> | object;
  pagesInfo: IEnquiryPageInfo[];
}
