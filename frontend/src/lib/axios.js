import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Use localhost to ensure SameSite=strict cookies are sent correctly
  withCredentials: true,
});

// Optional: Intercept responses to handle global errors like 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      // window.location.href = '/login'; // Or handle in AuthContext
    }
    return Promise.reject(error);
  }
);

export default api;
