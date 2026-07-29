import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import { useFetchProjects } from '@/features/projects/hooks/useFetchProjects';
import type { ProjectFilters } from '@/features/projects/api/projects.request';
import type { ApiClientError } from '@/app/http/error';

interface ProjectsContextType {
  filters: ProjectFilters;

  locations: string[];
  categories: string[];

  data: unknown;
  loading: boolean;
  error: ApiClientError | null;

  setFilter: <K extends keyof ProjectFilters>(
    key: K,
    value: ProjectFilters[K]
  ) => void;

  resetFilters: () => void;
}

const DEFAULT_FILTERS: ProjectFilters = {
  status: 'ALL',
  search: '',
  location: 'Mumbai',
  category: 'Residential',
};

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function ProjectsProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState<ProjectFilters>(DEFAULT_FILTERS);

  const { data, loading, error } = useFetchProjects(filters);

  const locations = useMemo(() => ['Mumbai', 'Thane', 'Pune'], []);

  const categories = useMemo(
    () => ['Residential', 'Commercial', 'Mixed Use'],
    []
  );

  const setFilter = useCallback(
    <K extends keyof ProjectFilters>(key: K, value: ProjectFilters[K]) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const value = useMemo(
    () => ({
      filters,

      locations,
      categories,

      data,
      loading,
      error,

      setFilter,
      resetFilters,
    }),
    [
      filters,
      locations,
      categories,
      data,
      loading,
      error,
      setFilter,
      resetFilters,
    ]
  );

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjectsContext() {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error('useProjectsContext must be used within ProjectsProvider');
  }

  return context;
}
