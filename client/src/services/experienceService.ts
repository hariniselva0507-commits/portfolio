import { api } from './api';
import { IExperience } from '../types';

export const experienceService = {
  getExperiences: async (): Promise<IExperience[]> => {
    const res = await api.get('/experience');
    return res.data.data;
  },

  createExperience: async (data: Partial<IExperience>): Promise<IExperience> => {
    const res = await api.post('/experience', data);
    return res.data.data;
  },

  updateExperience: async (id: string, data: Partial<IExperience>): Promise<IExperience> => {
    const res = await api.put(`/experience/${id}`, data);
    return res.data.data;
  },

  deleteExperience: async (id: string): Promise<void> => {
    await api.delete(`/experience/${id}`);
  },
};
