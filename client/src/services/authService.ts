import { api } from './api';
import { IAuthResponse, IUser } from '../types';

export const authService = {
  login: async (credentials: { email: string; password: string }): Promise<IAuthResponse> => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },

  setupInitialAdmin: async (adminData: { name: string; email: string; password: string }): Promise<IAuthResponse> => {
    const res = await api.post('/auth/setup', adminData);
    return res.data;
  },

  getMe: async (): Promise<{ success: boolean; user: IUser }> => {
    const res = await api.get('/auth/me');
    return res.data;
  },

  changePassword: async (passwords: { currentPassword: string; newPassword: string }) => {
    const res = await api.put('/auth/change-password', passwords);
    return res.data;
  },
};
