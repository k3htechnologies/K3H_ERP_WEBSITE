import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import type { ApiClientError } from '@/app/http/error';
import { useFetchJobs } from '@/features/jobsearch/hooks/useFetchJobs';
import { useFetchDepartments } from '@/features/jobsearch/hooks/useFetchDepartments';
import type { FilterDropdownOption } from '@/shared/components/FilterDropdown/FilterDropdown.type';
import type { JobOpeningResponse } from '@/features/jobsearch/api/jobsearch.response';

interface JobSearchContextType {
  filters: JobSearchFilters;

  locations: string[];
  departments: FilterDropdownOption[];
  experience: FilterDropdownOption[];

  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  hasMore: boolean;
  loadingMore: boolean;
  loadMore: () => void;

  data: JobOpeningResponse | null;
  loading: boolean;
  error: ApiClientError | null;

  setFilter: <K extends keyof JobSearchFilters>(
    key: K,
    value: JobSearchFilters[K]
  ) => void;

  resetFilters: () => void;
}

export interface JobSearchFilters {
  search: string;
  department: FilterDropdownOption;
  experience: FilterDropdownOption;
  location: string;
}

const DEFAULT_DEPARTMENT_OPTION: FilterDropdownOption = {
  label: 'All',
  value: '',
};

const DEFAULT_EXPERIENCE_OPTION: FilterDropdownOption = {
  label: 'Experience',
  value: '',
};

const DEFAULT_FILTERS: JobSearchFilters = {
  search: '',
  location: 'Mumbai',
  experience: DEFAULT_EXPERIENCE_OPTION,
  department: DEFAULT_DEPARTMENT_OPTION,
};

const PAGE_SIZE = 4;

const JobSearchContext = createContext<JobSearchContextType | null>(null);

export function JobSearchProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState<JobSearchFilters>(DEFAULT_FILTERS);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [jobs, setJobs] = useState<JobOpeningResponse>([]);

  const { data, loading, error } = useFetchJobs({
    pageSize: PAGE_SIZE,
    pageNumber,
    jobRoleStatus: true,
    roleName: filters.search,
    departmentMasterId: filters.department.value
      ? Number(filters.department.value)
      : 0,
    experienceYears: filters.experience.value ? filters.experience.value : '',
  });
  const totalRecords = data?.TotalNumberOfRecord ?? 0;
  const hasMore = pageNumber * PAGE_SIZE < totalRecords;
  const loadMore = useCallback(() => {
    if (loading || loadingMore || !hasMore) return;

    setLoadingMore(true);
    setPageNumber((prev) => prev + 1);
  }, [loading, loadingMore, hasMore]);

  useEffect(() => {
    if (!loading) {
      setLoadingMore(false);
    }
  }, [loading]);

  useEffect(() => {
    if (!data?.Data) return;
    const latestData = data.Data;
    setJobs((prev) => {
      if (pageNumber === 1) {
        return latestData;
      }
      const existingIds = new Set(prev.map((job) => job.JobOpeningMasterId));
      const newJobs = latestData.filter(
        (job) => !existingIds.has(job.JobOpeningMasterId)
      );
      return [...prev, ...newJobs];
    });
  }, [data, pageNumber]);

  const { data: departmentResponse } = useFetchDepartments();
  const departments = useMemo(() => {
    const apiOptions =
      departmentResponse?.Data?.map((department) => ({
        label: department.DepartmentName,
        value: String(department.DepartmentMasterId),
      })) ?? [];

    return [DEFAULT_DEPARTMENT_OPTION, ...apiOptions];
  }, [departmentResponse]);

  const locations = useMemo(() => ['Mumbai', 'Thane', 'Pune'], []);
  const experience = useMemo(
    () => [
      DEFAULT_EXPERIENCE_OPTION,
      { label: '0-2 Years', value: '0,2' },
      { label: '2-5 Years', value: '2,5' },
      { label: '5+ Years', value: '5,10' },
    ],
    []
  );

  const setFilter = useCallback(
    <K extends keyof JobSearchFilters>(key: K, value: JobSearchFilters[K]) => {
      setJobs([]);
      setPageNumber(1);
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setJobs([]);
    setPageNumber(1);
    setFilters(DEFAULT_FILTERS);
  }, []);

  const value = useMemo(
    () => ({
      filters,

      locations,
      departments,
      experience,

      pageNumber,
      pageSize: PAGE_SIZE,
      totalRecords,
      hasMore,
      loadingMore,
      loadMore,

      data: jobs,
      loading,
      error,

      setFilter,
      resetFilters,
    }),
    [
      filters,
      jobs,
      locations,
      departments,
      experience,

      data,
      loading,
      error,

      pageNumber,
      totalRecords,
      hasMore,
      loadingMore,

      setFilter,
      resetFilters,
      loadMore,
    ]
  );

  return (
    <JobSearchContext.Provider value={value}>
      {children}
    </JobSearchContext.Provider>
  );
}

export function useJobSearchContext() {
  const context = useContext(JobSearchContext);

  if (!context) {
    throw new Error(
      'useJobSearchContext must be used within JobSearchProvider'
    );
  }

  return context;
}
