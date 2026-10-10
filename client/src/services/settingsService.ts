import { api } from './api';
import { IWebsiteSettings, IDashboardStats, IMediaFile } from '../types';

export const settingsService = {
  getSettings: async (): Promise<IWebsiteSettings> => {
    const res = await api.get('/settings');
    return res.data.data;
  },

  updateSettings: async (settingsData: Partial<IWebsiteSettings>): Promise<IWebsiteSettings> => {
    const res = await api.put('/settings', settingsData);
    return res.data.data;
  },

  trackResumeDownload: async (): Promise<{ success: boolean; downloadCount: number }> => {
    const res = await api.post('/settings/download-resume');
    return res.data;
  },

  getStats: async (): Promise<IDashboardStats> => {
    const res = await api.get('/stats');
    return res.data.data;
  },

  uploadFile: async (file: File): Promise<{ fileUrl: string; fileName: string; originalName: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  listFiles: async (): Promise<IMediaFile[]> => {
    const res = await api.get('/upload');
    return res.data.files || [];
  },

  deleteFile: async (filename: string): Promise<void> => {
    await api.delete(`/upload/${filename}`);
  },
};
