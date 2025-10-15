import type { Request } from '../types';

// NOTA: Estos datos mock ya no se usan en producción. Solo sirven para pruebas o desarrollo local.

export const initialRequests: Request[] = [
  {
    id: 1,
    tipo: 'Infraestructura Vial',
    location: 'Zona 1, 5a Av. 3-45',
    description: 'Bache profundo en calzada principal frente a parque central.',
    status: 'PENDIENTE',
    priority: 'ALTA',
    date: '2025-09-24',
    source: 'PARTICIPACION_CIUDADANA',
    externalReportId: 1001,
    financialStatus: 'PENDIENTE'
  },
  {
    id: 2,
    tipo: 'Drenajes',
    location: 'Zona 7, Calz. San Juan',
    description: 'Alcantarilla obstruida genera inundación en horas pico.',
    status: 'PROGRAMADA',
    priority: 'MEDIA',
    date: '2025-09-23',
    source: 'CIUDADANO',
    externalReportId: 1002,
    financialStatus: 'APROBADO'
  },
  {
    id: 3,
    tipo: 'Alumbrado Público',
    location: 'Zona 12, Alejandro Tzul',
    description: 'Poste de alumbrado caído bloqueando carril derecho.',
    status: 'EN_PROGRESO',
    priority: 'ALTA',
    date: '2025-09-22',
    source: 'INTERNO',
    externalReportId: 1003,
    financialStatus: 'EN_ESPERA_FINANCIAMIENTO'
  },
  {
    id: 4,
    tipo: 'Señalización',
    location: 'Zona 3, Periférico',
    description: 'Semáforo intermitente provoca congestionamiento.',
    status: 'FINALIZADA',
    priority: 'BAJA',
    date: '2025-09-21',
    source: 'PARTICIPACION_CIUDADANA',
    externalReportId: 1004,
    financialStatus: 'FINANCIADA'
  },
  {
    id: 5,
    tipo: 'Agua y Saneamiento',
    location: 'Zona 18, San Rafael',
    description: 'Fuga de agua visible sobre la acera contigua a escuela.',
    status: 'CANCELADA',
    priority: 'MEDIA',
    date: '2025-09-20',
    source: 'CIUDADANO',
    externalReportId: 1005,
    financialStatus: 'RECHAZADO'
  },
];

export const dashboardData: Request[] = [
  {
    id: 101,
    tipo: 'Infraestructura Vial',
    location: 'Zona 1',
    description: 'Bache en Calle 10',
    status: 'PENDIENTE',
    priority: 'ALTA',
    date: '2025-09-24',
    source: 'PARTICIPACION_CIUDADANA',
    externalReportId: 2001,
    financialStatus: 'PENDIENTE'
  },
  {
    id: 102,
    tipo: 'Drenajes',
    location: 'Zona 1',
    description: 'Alcantarilla obstruida',
    status: 'PROGRAMADA',
    priority: 'MEDIA',
    date: '2025-09-24',
    source: 'CIUDADANO',
    externalReportId: 2002,
    financialStatus: 'APROBADO'
  },
  {
    id: 103,
    tipo: 'Alumbrado Público',
    location: 'Zona 1',
    description: 'Lámpara fundida',
    status: 'FINALIZADA',
    priority: 'BAJA',
    date: '2025-09-24',
    source: 'INTERNO',
    externalReportId: 2003,
    financialStatus: 'FINANCIADA'
  },
  {
    id: 104,
    tipo: 'Señalización',
    location: 'Zona 1',
    description: 'Semáforo dañado',
    status: 'EN_PROGRESO',
    priority: 'ALTA',
    date: '2025-09-24',
    source: 'PARTICIPACION_CIUDADANA',
    externalReportId: 2004,
    financialStatus: 'EN_ESPERA_FINANCIAMIENTO'
  },
  {
    id: 105,
    tipo: 'Agua y Saneamiento',
    location: 'Zona 1',
    description: 'Fuga menor',
    status: 'CANCELADA',
    priority: 'MEDIA',
    date: '2025-09-24',
    source: 'CIUDADANO',
    externalReportId: 2005,
    financialStatus: 'RECHAZADO'
  },
];
