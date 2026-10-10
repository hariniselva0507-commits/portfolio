import { api } from './api';
import { IBlogPost, IPagination } from '../types';

export const blogService = {
  getPosts: async (params?: {
    all?: boolean;
    category?: string;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ success: boolean; data: IBlogPost[]; pagination: IPagination }> => {
    const res = await api.get('/blog', { params });
    return res.data;
  },

  getPostById: async (id: string): Promise<IBlogPost> => {
    const res = await api.get(`/blog/${id}`);
    return res.data.data;
  },

  createPost: async (data: Partial<IBlogPost>): Promise<IBlogPost> => {
    const res = await api.post('/blog', data);
    return res.data.data;
  },

  updatePost: async (id: string, data: Partial<IBlogPost>): Promise<IBlogPost> => {
    const res = await api.put(`/blog/${id}`, data);
    return res.data.data;
  },

  deletePost: async (id: string): Promise<void> => {
    await api.delete(`/blog/${id}`);
  },

  togglePublish: async (id: string): Promise<IBlogPost> => {
    const res = await api.patch(`/blog/${id}/publish`);
    return res.data.data;
  },
};
