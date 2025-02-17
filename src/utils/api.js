export const API_BASE_URL = '/api';
export const FULL_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
};