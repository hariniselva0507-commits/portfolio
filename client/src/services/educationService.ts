import { api } from './api';
import { IEducation } from '../types';

export const educationService = {
  getEducation: async (): Promise<IEducation[]> => {
    const res = await api.get('/education');
    return res.data.data;
  },

  createEducation: async (data: Partial<IEducation>): Promise<IEducation> => {
    const res = await api.post('/education', data);
    return res.data.data;
  },

  updateEducation: async (id: string, data: Partial<IEducation>): Promise<IEducation> => {
    const res = await api.put(`/education/${id}`, data);
    return res.data.data;
  },

  deleteEducation: async (id: string): Promise<void> => {
    await api.delete(`/education/${id}`);
  },
};
