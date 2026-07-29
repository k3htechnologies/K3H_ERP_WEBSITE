export type ProjectStatus =
  | 'ALL'
  | 'ONGOING'
  | 'COMPLETED'
  | 'UPCOMING';

export interface ProjectFilters {
  status: ProjectStatus;
  search: string;
  location: string;
  category: string;
}