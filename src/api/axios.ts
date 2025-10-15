import axios from 'axios';

// Configuración base de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // URL base de tu API
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente (opcional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
