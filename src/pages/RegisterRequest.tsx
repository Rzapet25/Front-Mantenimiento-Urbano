import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Header from '../components/Header';

export default function RegisterRequest() {
  const navigate = useNavigate();
  const [useMap, setUseMap] = useState(true);
  const [location, setLocation] = useState('Ej : 5a avenida 3-45, Zona 1, Guatemala');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    alert('Solicitud registrada exitosamente');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Gestión de Mantenimiento Urbano"
        showSearch={false}
      />

      <main className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Formulario de Registro de Solicitud</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ubicación (mapa o texto)</h3>
            
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setUseMap(true)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  useMap ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Mapa
              </button>
              <button
                onClick={() => setUseMap(false)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  !useMap ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Texto
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {useMap ? (
                  <div className="border-2 border-gray-300 rounded-lg h-64 bg-gray-50 flex items-center justify-center relative">
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
                      {[...Array(24)].map((_, i) => (
                        <div key={i} className="border border-gray-200"></div>
                      ))}
                    </div>
                    <MapPin className="text-red-500 z-10" size={40} />
                    <p className="absolute bottom-4 left-4 text-sm text-gray-600 bg-white px-3 py-1 rounded">
                      Arrastra el pin para ajustar la ubicación o cambia a modo Texto.
                    </p>
                  </div>
                ) : (
                  <textarea
                    className="w-full h-64 border-2 border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="Describe la ubicación..."
                  />
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de recepción
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="Ubicación"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción del problema
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-32 border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="Describe brevemente el problema observado..."
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-lg"
            >
              Registrar solicitud
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
