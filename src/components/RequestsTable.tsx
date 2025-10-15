
import type { Request } from '../types';
import {
  getStatusColor,
  getStatusText,
  getPriorityColor,
  getPriorityText,
  getFinancialStatusColor,
  getFinancialStatusText,
} from '../utils/statusHelpers';
import { useState } from 'react';
import ModalFinanciamiento from './ModalFinanciamiento';
import { financiamientoService } from '../api/financiamientoService';
import type { SolicitudFinanciamientoBody } from '../api/financiamientoService';

interface RequestsTableProps {
  requests: Request[];
  onProgramRequest?: (id: string | number) => void;
  showFinancialStatus?: boolean;
}


export default function RequestsTable({ 
  requests, 
  onProgramRequest,
  showFinancialStatus = true 
}: RequestsTableProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [financiamientoLoading, setFinanciamientoLoading] = useState(false);

  const handleOpenModal = (id: number) => {
    setSelectedId(id);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  const handleFinanciamiento = async (body: SolicitudFinanciamientoBody) => {
    if (!selectedId) return;
    setFinanciamientoLoading(true);
    try {
      await financiamientoService.solicitarFinanciamiento(selectedId, body);
      // Aquí podrías mostrar un toast o recargar datos
    } finally {
      setFinanciamientoLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tipo</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ubicación</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Descripción</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Prioridad</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado</th>
              {showFinancialStatus && (
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado Financiero</th>
              )}
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Fecha</th>
              {onProgramRequest && (
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Acción</th>
              )}
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Financiamiento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{item.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.tipo}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.location}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.description}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {getPriorityText(item.priority)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {getStatusText(item.status)}
                  </span>
                </td>
                {showFinancialStatus && (
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getFinancialStatusColor(item.financialStatus)}`}>
                      {getFinancialStatusText(item.financialStatus)}
                    </span>
                  </td>
                )}
                <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                {onProgramRequest && (
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onProgramRequest(item.id)}
                      className="text-sm text-gray-900 hover:text-blue-600 font-medium"
                    >
                      Programar
                    </button>
                  </td>
                )}
                <td className="px-6 py-4">
                  {item.status === 'PROGRAMADA' ? (
                    <button
                      className="text-sm text-green-700 hover:text-green-900 font-medium border border-green-400 rounded px-3 py-1"
                      onClick={() => handleOpenModal(item.id)}
                      disabled={financiamientoLoading}
                    >
                      Solicitar financiamiento
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">No disponible</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalFinanciamiento
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFinanciamiento}
      />
    </div>
  );
}
