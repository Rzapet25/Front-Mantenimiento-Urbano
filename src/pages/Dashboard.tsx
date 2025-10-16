import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import RequestsTable from '../components/RequestsTable';
import { requestsService } from '../api/requestsService';
import { mapApiRequestsToRequests } from '../utils/mappers';
import type { Request } from '../types';

export default function Dashboard() {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar todas las solicitudes al montar el Dashboard
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiRequests = await requestsService.getPendingRequests();
        const mappedRequests = mapApiRequestsToRequests(apiRequests);
        setRequests(mappedRequests);
      } catch {
        setError('No se pudieron cargar las solicitudes.');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Calcular totales por estado
  const stats = {
    pending: requests.filter(r => r.status === 'PENDIENTE').length,
    scheduled: requests.filter(r => r.status === 'PROGRAMADA').length,
    completed: requests.filter(r => r.status === 'FINALIZADA').length,
  };

  // Mostrar las últimas 5 solicitudes (ordenadas por fecha descendente)
  const latestRequests = [...requests]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Mantenimiento Urbano"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        username="username"
      />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Pendientes"
              value={stats.pending}
              color="orange"
              onViewDetails={() => console.log('Ver pendientes')}
            />
            <StatsCard
              title="Programadas"
              value={stats.scheduled}
              color="blue"
              onViewDetails={() => console.log('Ver programadas')}
            />
            <StatsCard
              title="Atendidas"
              value={stats.completed}
              color="green"
              onViewDetails={() => console.log('Ver atendidas')}
            />
          </div>

           <div className="flex gap-4 mb-8">
           {/* Registrar solicitud */}
             <button 
              onClick={() => navigate('/registrar')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
             >
           Registrar solicitud
          </button>

           {/* Consultar */}
           <button 
            onClick={() => navigate('/solicitudes')}
            className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Consultar
            </button>

            {/* Programar */}
           <button 
           onClick={() => navigate('/programar/1')}
           className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
             >
           Programar
          </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600">Cargando solicitudes...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          ) : (
            <RequestsTable
             requests={latestRequests}
             showFinancialStatus={false}
          />
          )}
        </main>
      </div>
    </div>
  );
}
