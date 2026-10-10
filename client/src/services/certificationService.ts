import { api } from './api';
import { ICertification } from '../types';

export const certificationService = {
  getCertifications: async (): Promise<ICertification[]> => {
    const res = await api.get('/certifications');
    return res.data.data;
  },

  createCertification: async (data: Partial<ICertification>): Promise<ICertification> => {
    const res = await api.post('/certifications', data);
    return res.data.data;
  },

  updateCertification: async (id: string, data: Partial<ICertification>): Promise<ICertification> => {
    const res = await api.put(`/certifications/${id}`, data);
    return res.data.data;
  },

  deleteCertification: async (id: string): Promise<void> => {
    await api.delete(`/certifications/${id}`);
  },
};
