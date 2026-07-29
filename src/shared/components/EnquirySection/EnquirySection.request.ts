export interface LocationsRequest {
  pageSize?: number;
  pageNumber?: number;
  villageName?: string;
}

export interface LocationBasedProjectsRequest {
  pageSize?: number;
  pageNumber?: number;
  LocationId: number;
}

export interface SubmitEnquiryRequest {
  UniqueKey: string;
  WebsiteLeadId: number;
  ProjectLocation: string;
  ProjectId: string;
  FullName: string;
  MobileNo: string;
  EmailAddress: string;
}
