import { api } from './api';
import { IProfile } from '../types';

export const profileService = {
  getProfile: async (): Promise<IProfile> => {
    const res = await api.get('/profile');
    return res.data.data;
  },

  updateProfile: async (profileData: Partial<IProfile>): Promise<IProfile> => {
    const res = await api.put('/profile', profileData);
    return res.data.data;
  },
};
