import api from '@/service/api';
import endpoints from '@/service/endpoints';
import { getCredentials, setCredentials } from '@/service/storage';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAxiosInterceptors = () => {
  const router = useRouter();

  const renewToken = (token) => {
    if (!token) return false;
    try {
      const response = api.post(endpoints.auth.REFRESH_TOKEN, {
        refreshToken: token
      });
      const { accessToken, refreshToken } = response?.data;
      setCredentials({ accessToken, refreshToken });
      return accessToken;
    } catch (e) {
      return false;
    }
  }

  useEffect(() => {
    const { accessToken, refreshToken } = getCredentials() || {};
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Se o status for 401 e ainda não tentamos o refresh
        if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
          originalRequest._retry = true;

          try {
            const newToken = await renewToken(refreshToken); // Função que faz a requisição para renovar o token
            if (!newToken) {
              throw 1;
            }

            // Altera o cabeçalho Authorization com o novo token
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            // Reenvia a requisição original com o novo token
            return api(originalRequest);
          } catch (refreshError) {
            // Caso o refresh também falhe, redireciona para o login
            // navigate('/login');
            router.replace("/auth");
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return null;
};

export default useAxiosInterceptors;