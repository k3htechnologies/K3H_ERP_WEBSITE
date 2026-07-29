export interface ProjectConfiguration {
  FlatConfiguration: string;
  RERACarpetAreaSqFt: number;
}

export interface ProjectDetails {
  ProjectId: number;
  ProjectName: string;
  ProjectPhotoURL: string;
  ProjectLocation: string;
  RERANumber: string;
  ProjectStatus: string;
  RERAComplitionDate: string;
  ProjectAreaInSqft: number;
  ProjectScheme: string;
  BussinessCategory: string;
  SiteContactName: string;
  SiteContactMobileNumber: string;
  Amenities: string | null;
  Configurations: ProjectConfiguration[];
}

export type ProjectDetailsResponse = ProjectDetails[];
