import { useRef, useState } from 'react';
import type { SolicitudFinanciamientoBody } from '../api/financiamientoService';

interface AdjuntosFinanciamiento {
  nombreArchivo: string;
  tipoMime: string;
  contenido: string;
}

interface ModalFinanciamientoProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (body: SolicitudFinanciamientoBody) => Promise<void>;
}

export default function ModalFinanciamiento({ open, onClose, onSubmit }: ModalFinanciamientoProps) {
  const [tipoGasto, setTipoGasto] = useState('');
  const [montoEstimado, setMontoEstimado] = useState('');
  const [adjuntos, setAdjuntos] = useState<AdjuntosFinanciamiento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const adjuntosArr: AdjuntosFinanciamiento[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = await fileToBase64(file);
      adjuntosArr.push({
        nombreArchivo: file.name,
        tipoMime: file.type,
        contenido: base64,
      });
    }
    setAdjuntos(adjuntosArr);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!tipoGasto.trim() || !montoEstimado || isNaN(Number(montoEstimado)) || Number(montoEstimado) <= 0) {
      setError('Completa todos los campos requeridos y verifica el monto.');
      return;
    }
    setLoading(true);
    try {
      await onSubmit({
        tipoGasto: tipoGasto.trim(),
        montoEstimado: Number(montoEstimado),
        adjuntos: adjuntos.length > 0 ? adjuntos : undefined,
      });
      setTipoGasto('');
      setMontoEstimado('');
      setAdjuntos([]);
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al enviar la solicitud.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Solicitar Financiamiento</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de gasto *</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={tipoGasto}
              onChange={e => setTipoGasto(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Monto estimado (Q) *</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={montoEstimado}
              onChange={e => setMontoEstimado(e.target.value)}
              min={1}
              step={0.01}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Adjuntar archivos (PDF, opcional)</label>
            <input
              type="file"
              accept="application/pdf"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={loading}
            />
            {adjuntos.length > 0 && (
              <ul className="mt-2 text-xs text-gray-600">
                {adjuntos.map((a, i) => (
                  <li key={i}>{a.nombreArchivo} ({a.tipoMime})</li>
                ))}
              </ul>
            )}
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Solicitar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
