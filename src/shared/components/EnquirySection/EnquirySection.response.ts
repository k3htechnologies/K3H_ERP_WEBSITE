export interface Locations {
  VillageMasterId: number;
  VillageName: string;
}

export interface Project {
  ProjectId: number;
  ProjectName: string;
}

export type LocationsResponse = Locations[];
export type ProjectResponse = Project[];
