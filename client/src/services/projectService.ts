import { api } from './api';
import { IProject, IPagination } from '../types';

export interface ProjectQueryParams {
  search?: string;
  category?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
  all?: boolean;
}

export interface ProjectsResponse {
  success: boolean;
  data: IProject[];
  pagination: IPagination;
}

export const projectService = {
  getProjects: async (params?: ProjectQueryParams): Promise<ProjectsResponse> => {
    const res = await api.get('/projects', { params });
    return res.data;
  },

  getProjectById: async (idOrSlug: string): Promise<IProject> => {
    const res = await api.get(`/projects/${idOrSlug}`);
    return res.data.data;
  },

  createProject: async (projectData: Partial<IProject>): Promise<IProject> => {
    const res = await api.post('/projects', projectData);
    return res.data.data;
  },

  updateProject: async (id: string, projectData: Partial<IProject>): Promise<IProject> => {
    const res = await api.put(`/projects/${id}`, projectData);
    return res.data.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  toggleFeatured: async (id: string): Promise<IProject> => {
    const res = await api.patch(`/projects/${id}/featured`);
    return res.data.data;
  },
};
