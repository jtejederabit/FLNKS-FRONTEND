import axios, { AxiosInstance } from 'axios';
import router from '../router';

const unauthorizedCodes: number[] = [401, 403];
const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

instance.interceptors.request.use(
  (config) => {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && unauthorizedCodes.includes(error.response.status)) {
      localStorage.removeItem('token');
      await router.push({ name: 'Login' });
    }
    return Promise.reject(error);
  }
);

export default instance;
