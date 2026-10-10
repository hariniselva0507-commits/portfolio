import { api } from './api';
import { IService } from '../types';

export const serviceService = {
  getServices: async (params?: { all?: boolean }): Promise<{ success: boolean; data: IService[] }> => {
    const res = await api.get('/services', { params });
    return res.data;
  },

  createService: async (data: Partial<IService>): Promise<IService> => {
    const res = await api.post('/services', data);
    return res.data.data;
  },

  updateService: async (id: string, data: Partial<IService>): Promise<IService> => {
    const res = await api.put(`/services/${id}`, data);
    return res.data.data;
  },

  deleteService: async (id: string): Promise<void> => {
    await api.delete(`/services/${id}`);
  },
};
