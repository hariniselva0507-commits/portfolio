import { api } from './api';
import { ISkill } from '../types';

export const skillService = {
  getSkills: async (params?: { category?: string; featured?: boolean; grouped?: boolean }) => {
    const res = await api.get('/skills', { params });
    return res.data;
  },

  createSkill: async (skillData: Partial<ISkill>): Promise<ISkill> => {
    const res = await api.post('/skills', skillData);
    return res.data.data;
  },

  updateSkill: async (id: string, skillData: Partial<ISkill>): Promise<ISkill> => {
    const res = await api.put(`/skills/${id}`, skillData);
    return res.data.data;
  },

  deleteSkill: async (id: string): Promise<void> => {
    await api.delete(`/skills/${id}`);
  },
};
