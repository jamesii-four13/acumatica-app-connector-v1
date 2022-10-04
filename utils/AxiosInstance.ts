import axios from 'axios';
import { ApiResponseMessage } from '../types';

const axiosInstance = axios.create();

axiosInstance.defaults.headers.common = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  'X-API-KEY': process.env.NEXT_PUBLIC_REST_API_KEY,
};

const errorComposer = (error: Error): ApiResponseMessage => {
  return {}
};

axiosInstance.interceptors.request.use(undefined, (error) => {
  error.handleGlobally = errorComposer(error);

  return Promise.reject(error);
});

export default axiosInstance;