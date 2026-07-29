import { createContext, useContext, useEffect, type ReactNode } from 'react';

import { useFetchProjectDetails } from '@/features/project-details/hooks/useFetchProjectDetails';
import type { ProjectDetails } from '@/features/project-details/api/project-details.response';
import { useEnquiryModal } from '@/app/provider/EnquiryProvider/EnquiryModalContext';

interface ProjectDetailsContextType {
  data: ProjectDetails | null;
  loading: boolean;
  error: unknown;
}

export const ProjectDetailsContext =
  createContext<ProjectDetailsContextType | null>(null);

interface ProviderProps {
  projectId: string;
  children: ReactNode;
}

export function ProjectDetailsProvider({ projectId, children }: ProviderProps) {
  const { data, loading, error } = useFetchProjectDetails(projectId);
  const { openEnquiryModal } = useEnquiryModal();
  useEffect(() => {
    if (!loading && data && data.ProjectName && data.ProjectLocation) {
      openEnquiryModal({
        location: {
          id: String('1'), // hardcoded coz it's no need in enquiry payload
          label: data.ProjectLocation,
        },
        project: {
          id: String(data.ProjectId),
          label: data.ProjectName,
        },
        locked: true,
      });
    }
  }, [loading, data, openEnquiryModal]);
  return (
    <ProjectDetailsContext.Provider
      value={{
        data,
        loading,
        error,
      }}
    >
      {children}
    </ProjectDetailsContext.Provider>
  );
}

export function useProjectDetailsContext() {
  const context = useContext(ProjectDetailsContext);

  if (!context) {
    throw new Error(
      'useProjectDetails must be used within ProjectDetailsProvider'
    );
  }

  return context;
}
