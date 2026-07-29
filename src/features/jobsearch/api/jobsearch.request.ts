export interface JobSearchRequest {
  pageSize?: number;
  pageNumber?: number;
  jobOpeningMasterId?: number;
  departmentMasterId?: number;
  jobRoleMasterId?: number;
  workMode?: string;
  employmentType?: string;
  experienceYears?: string;
  roleName?: string;
  jobRoleStatus?: boolean;
}
