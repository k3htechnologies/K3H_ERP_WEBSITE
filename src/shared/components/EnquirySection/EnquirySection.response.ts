export interface Locations {
  CityMasterId: number;
  CityName: string;
}

export interface Project {
  ProjectId: number;
  ProjectName: string;
}

export type LocationsResponse = Locations[];
export type ProjectResponse = Project[];
