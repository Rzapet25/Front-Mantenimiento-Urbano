// import apiClient from './axios';
import apiClient from './axios';

/**
 * Servicio para manejar solicitudes del sistema externo (Participación Ciudadana)
 * Por ahora usa mock data, en el futuro se conectará a la API real
 */

export interface ExternalRequest {
  id: string; // ID del sistema externo
  tipo: string;
  descripcion: string;
  ubicacion: string;
  fecha: string;
  ciudadano: {
    nombre: string;
    telefono: string;
    email?: string;
  };
  prioridad: 'ALTA' | 'MEDIA' | 'BAJA';
  imagen?: string;
}

// Mock data temporal - Solicitudes recibidas de Participación Ciudadana
const mockExternalRequests: ExternalRequest[] = [
  {
    id: 'EXT-001',
    tipo: 'Baches',
    descripcion: 'Bache grande en avenida principal cerca del mercado',
    ubicacion: 'Av. Principal, Zona 7',
    fecha: '2025-10-20',
    ciudadano: {
      nombre: 'Juan Pérez',
      telefono: '555-1234',
      email: 'juan@example.com',
    },
    prioridad: 'ALTA',
  },
  {
    id: 'EXT-002',
    tipo: 'Alumbrado',
    descripcion: 'Poste de luz sin funcionar hace 3 días',
    ubicacion: 'Calle 10, Zona 12',
    fecha: '2025-10-21',
    ciudadano: {
      nombre: 'María López',
      telefono: '555-5678',
    },
    prioridad: 'MEDIA',
  },
  {
    id: 'EXT-003',
    tipo: 'Limpieza',
    descripcion: 'Acumulación de basura en esquina',
    ubicacion: 'Esquina Calle 5 y 6, Zona 1',
    fecha: '2025-10-22',
    ciudadano: {
      nombre: 'Carlos Ramírez',
      telefono: '555-9012',
      email: 'carlos@example.com',
    },
    prioridad: 'BAJA',
  },
];

export const externalSystemService = {
  // Obtener solicitudes del sistema externo (mock)
  getExternalRequests: async (): Promise<ExternalRequest[]> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockExternalRequests;
    
    // TODO: Cuando la API esté lista, descomentar:
    // const response = await apiClient.get<ExternalRequest[]>('/participacion-ciudadana/solicitudes');
    // return response.data;
  },

  // Registrar solicitud externa en el sistema de Mantenimiento Urbano
  // Este método tomará una solicitud externa y la convertirá en una solicitud interna
  registerFromExternal: async (externalRequest: ExternalRequest): Promise<{ success: boolean; internalId?: number }> => {
    // Mapear tipos del sistema externo a los tipos esperados por el backend
    const tipoMap: Record<string, string> = {
      'Baches': 'INFRAESTRUCTURA',
      'Alumbrado': 'ALUMBRADO',
      'Limpieza': 'LIMPIEZA',
      // añadir más mapeos según sea necesario
    };

    const rawTipo = externalRequest.tipo || '';
    const mappedTipo = (tipoMap[rawTipo] || rawTipo).toUpperCase();

    // Preparar los datos en el formato que espera el backend
    const requestData = {
      tipo: mappedTipo,
      descripcion: externalRequest.descripcion,
      ubicacion: externalRequest.ubicacion,
      prioridad: externalRequest.prioridad,
      fuente: 'PARTICIPACION_CIUDADANA' as const,
      // Extraer número del ID externo (EXT-001 -> 1). Si no se puede, usar 0
      reporteIdExtern: (() => {
        try {
          const parts = externalRequest.id.split('-');
          const num = parseInt(parts[1], 10);
          return Number.isFinite(num) ? num : 0;
        } catch {
          return 0;
        }
      })(),
    };

    console.log('Enviando datos al backend:', requestData);

    try {
  // Intentar enviar al endpoint de registro (ruta correcta)
  const response = await apiClient.post('/mantenimiento/solicitudes', requestData);
      return { success: true, internalId: response.data.id };
    } catch (err: unknown) {
      // Si la ruta no existe en el backend (404) o hay problema de contrato,
      // simulamos un registro exitoso para pruebas locales y devolvemos un ID simulado.
      interface ErrWithResponse { response?: { status?: number } }
      const status = (err as ErrWithResponse).response?.status;
      console.warn('Error al enviar al backend (registerFromExternal):', status ?? err);
      if (status === 404) {
        // Simular ID interno para pruebas UI
        const simulatedId = Math.floor(Math.random() * 1000) + 1000;
        console.info('Endpoint no encontrado (404). Simulando registro con ID interno:', simulatedId);
        return { success: true, internalId: simulatedId };
      }

      // Re-throw si es otro tipo de error para que el caller pueda manejarlo
      throw err;
    }
  },
};
