import { api } from './api';
import { IContactMessage } from '../types';

export interface SendContactMessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website_hp?: string;
}

export const contactService = {
  sendMessage: async (data: SendContactMessageData) => {
    const res = await api.post('/contact', data);
    return res.data;
  },

  getMessages: async (unreadOnly?: boolean): Promise<{ data: IContactMessage[]; unreadCount: number }> => {
    const res = await api.get('/contact', { params: { unreadOnly } });
    return res.data;
  },

  markAsRead: async (id: string, isRead: boolean = true): Promise<IContactMessage> => {
    const res = await api.patch(`/contact/${id}/read`, { isRead });
    return res.data.data;
  },

  deleteMessage: async (id: string): Promise<void> => {
    await api.delete(`/contact/${id}`);
  },
};
