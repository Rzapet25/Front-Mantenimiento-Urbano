import axios from './axios';

export interface AdjuntosFinanciamiento {
  nombreArchivo: string;
  tipoMime: string;
  contenido: string; // base64
}

export interface SolicitudFinanciamientoBody {
  tipoGasto: string;
  montoEstimado: number;
  adjuntos?: AdjuntosFinanciamiento[];
}

export const financiamientoService = {
  async solicitarFinanciamiento(idSolicitud: number, body: SolicitudFinanciamientoBody) {
    // Log para control
    console.log('Enviando solicitud de financiamiento:', {
      url: `/api/mantenimiento/solicitudes/${idSolicitud}/financiamiento`,
      body,
    });
    const response = await axios.post(`/api/mantenimiento/solicitudes/${idSolicitud}/financiamiento`, body);
    return response.data;
  },
};
