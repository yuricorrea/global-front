import api from '@/service/api';
import useAxiosInterceptors from './useAxiosInterceptors';

const useApi = () => {
  useAxiosInterceptors();

  const handleRequest = async (request) => {
    try {
      const response = await request();
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        data: error?.response?.data,
        errorCode: error?.response?.status
      }
    }
  }

  const get = (url, config = {}) => handleRequest(() => api.get(url, config));
  const post = (url, data, config = {}) => handleRequest(() => api.post(url, data, config));
  const put = (url, data, config = {}) => handleRequest(() => api.put(url, data, config));
  const del = (url, config = {}) => handleRequest(() => api.delete(url, config));

  return { get, post, put, del };
};

export default useApi;