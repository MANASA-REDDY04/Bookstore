const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const API_PATHS = {
  GET_BOOKS: `${API_BASE_URL}/books`,
  SEARCH_BOOKS: (query) => `${API_BASE_URL}/search?q=${query}`,
};
