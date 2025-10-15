import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import { requestsService } from '../api/requestsService';
import { mapApiRequestsToRequests } from '../utils/mappers';
import {
  getStatusColor,
  getStatusText,
  getPriorityColor,
  getPriorityText,
  getFinancialStatusColor,
  getFinancialStatusText,
} from '../utils/statusHelpers';
import type { Request } from '../types';

export default function RequestsList() {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState('');
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar solicitudes pendientes al montar el componente
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiRequests = await requestsService.getPendingRequests();
        const mappedRequests = mapApiRequestsToRequests(apiRequests);
        setRequests(mappedRequests);
      } catch (err) {
        console.error('Error al cargar solicitudes:', err);
        setError('No se pudieron cargar las solicitudes. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []); // Array vacío = solo se ejecuta al montar

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Gestión de Mantenimiento Urbano"
        showSearch={false}
      />

      <main className="max-w-7xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center">
              <AlertCircle className="text-green-700" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Lista de Solicitudes Pendientes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zona</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
                <option>Todas las zonas</option>
                <option>Zona 1</option>
                <option>Zona 7</option>
                <option>Zona 12</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
                <option>Todos los tipos</option>
                <option>Baches</option>
                <option>Alcantarillas</option>
                <option>Alumbrado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex items-end">
              <button className="w-full px-6 py-2 bg-green-300 hover:bg-green-400 text-gray-800 font-medium rounded-lg transition">
                Programar trabajo
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                <p className="mt-4 text-gray-600">Cargando solicitudes...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">
                  <AlertCircle size={48} className="mx-auto" />
                </div>
                <p className="text-red-600 font-semibold">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-green-300 hover:bg-green-400 text-gray-800 font-medium rounded-lg transition"
                >
                  Reintentar
                </button>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No hay solicitudes pendientes.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tipo</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ubicación</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Descripción</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Prioridad</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado Financiero</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{request.tipo}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{request.location}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{request.description}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                          {getPriorityText(request.priority)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {getStatusText(request.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getFinancialStatusColor(request.financialStatus)}`}>
                          {getFinancialStatusText(request.financialStatus)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{request.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-600">
            {!loading && !error && requests.length > 0 && (
              `Mostrando 1-${requests.length} de ${requests.length} resultados`
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
          >
            Volver al Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}
