import apiClient from './axios';
import type { ApiRequest } from '../types';

// Servicio para manejar todas las peticiones relacionadas con solicitudes
export const requestsService = {
  // Obtener todas las solicitudes pendientes
  getPendingRequests: async (): Promise<ApiRequest[]> => {
    const response = await apiClient.get<ApiRequest[]>('/mantenimiento/solicitudes/pendientes');
    return response.data;
  },

  // Aquí se pueden agregar más métodos según lo necesitemos
  // getRequestById: async (id: number): Promise<ApiRequest> => { ... },
  // createRequest: async (request: Partial<ApiRequest>): Promise<ApiRequest> => { ... },
  // updateRequest: async (id: number, request: Partial<ApiRequest>): Promise<ApiRequest> => { ... },
};
