export interface FeaturedProject {
  GoogleLocation: string;
  ProjectLocation: string;
  ProjectPhotoURL: string;
  ProjectName: string;
  RERAPossessionDate: string;
  Description: string | null;
  Configuration: string | null;
  ProjectId: number;
}

export type FeaturedProjectsResponse = FeaturedProject[];
