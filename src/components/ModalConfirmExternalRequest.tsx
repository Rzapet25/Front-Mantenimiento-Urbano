import { MapPin, FileText, AlertTriangle, User } from 'lucide-react';
import type { ExternalRequest } from '../api/externalSystemService';
import BaseModal from './BaseModal';

interface ModalConfirmExternalRequestProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  request: ExternalRequest | null;
  loading?: boolean;
}

/**
 * Modal para confirmar el registro de una solicitud externa
 * Muestra los detalles de la solicitud y permite confirmar su importación
 * al sistema de Mantenimiento Urbano
 */
export default function ModalConfirmExternalRequest({
  isOpen,
  onClose,
  onConfirm,
  request,
  loading = false,
}: ModalConfirmExternalRequestProps) {
  if (!isOpen || !request) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      <>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center pt-6">
          Confirmar Registro de Solicitud
        </h2>
        
        <div className="px-6 pb-6 space-y-6">
          {/* Mensaje informativo */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Esta solicitud será registrada en el sistema de Mantenimiento Urbano
              y se le asignará un ID interno para su gestión.
            </p>
          </div>

          {/* Card de detalles de la solicitud */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 shadow-sm">
            {/* Título con ID */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                <FileText className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {request.titulo}
                </h3>
                <p className="text-sm text-gray-600 font-medium">ID: {request.id} • {request.tipo}</p>
              </div>
            </div>
            
            {/* Grid de información */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ubicación */}
              <div className="flex items-start gap-3">
                <MapPin className="text-green-600 mt-0.5 flex-shrink-0" size={18} />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Ubicación</p>
                  <p className="text-sm font-semibold text-gray-800">{request.ubicacion}</p>
                </div>
              </div>

              {/* Estado */}
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-green-600 mt-0.5 flex-shrink-0" size={18} />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Estado</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                    request.estado === 'Aprobado' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {request.estado}
                  </span>
                </div>
              </div>

              {/* Prioridad (si existe) */}
              {request.prioridad && (
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-green-600 mt-0.5 flex-shrink-0" size={18} />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Prioridad</p>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                      request.prioridad === 'ALTA' ? 'bg-red-100 text-red-800' :
                      request.prioridad === 'MEDIA' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {request.prioridad}
                    </span>
                  </div>
                </div>
              )}

              {/* Creado por */}
              <div className="flex items-start gap-3">
                <User className="text-green-600 mt-0.5 flex-shrink-0" size={18} />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Creado Por</p>
                  <p className="text-sm font-semibold text-gray-800">{request.creadoPor}</p>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="flex items-start gap-3">
                <FileText className="text-green-600 mt-0.5 flex-shrink-0" size={18} />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Descripción</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{request.descripcion}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nota informativa */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Nota:</strong> La prioridad se asignará automáticamente como MEDIA si no está especificada.
              Podrás modificarla después del registro.
            </p>
          </div>
        </div>

        {/* Footer con botones */}
        <div className="px-6 pb-6 pt-4 flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Confirmar Registro'}
          </button>
        </div>
      </>
    </BaseModal>
  );
}
