import type { ApiRequest, Request } from '../types';

/**
 * Transforma los datos de la API al formato usado internamente en la UI
 * Mapea todos los campos del backend, incluyendo tipo, fuente y estadoFinanciero
 */
export const mapApiRequestToRequest = (apiRequest: ApiRequest): Request => {
  return {
    id: apiRequest.id,
    tipo: apiRequest.tipo,
    location: apiRequest.ubicacion,
    description: apiRequest.descripcion,
    status: apiRequest.estado,
    priority: apiRequest.prioridad,
    date: apiRequest.fechaRegistro,
    source: apiRequest.fuente,
    externalReportId: apiRequest.reporteIdExtern,
    financialStatus: apiRequest.estadoFinanciero,
  };
};

/**
 * Transforma un array de solicitudes de la API
 */
export const mapApiRequestsToRequests = (apiRequests: ApiRequest[]): Request[] => {
  return apiRequests.map(mapApiRequestToRequest);
};
