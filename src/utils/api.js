export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export const getImageUrl = (path) => {
  if (!path) return '';
  try {
    new URL(path);
    return path;
  } catch {
    return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  }
};