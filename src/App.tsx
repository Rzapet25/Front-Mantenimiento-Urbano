import React, { useState } from 'react';
import { Search, Menu, MapPin, AlertCircle, ChevronRight } from 'lucide-react';

const initialRequests = [
  { id: 'S-0001', location: 'Zona 1, 5a Av. 3-45', description: 'Bache profundo en calzada principal frente a parque central.', status: 'Pendiente', date: '2025-09-24' },
  { id: 'S-0002', location: 'Zona 7, Calz. San Juan', description: 'Alcantarilla obstruida genera inundación en horas pico.', status: 'En revisión', date: '2025-09-23' },
  { id: 'S-0003', location: 'Zona 12, Alejandro Tzul', description: 'Poste de alumbrado caído bloqueando carril derecho.', status: 'Urgente', date: '2025-09-22' },
  { id: 'S-0004', location: 'Zona 3, Periférico', description: 'Semáforo intermitente provoca congestionamiento.', status: 'En revisión', date: '2025-09-21' },
  { id: 'S-0005', location: 'Zona 18, San Rafael', description: 'Fuga de agua visible sobre la acera contigua a escuela.', status: 'Pendiente', date: '2025-09-20' },
];

const dashboardData = [
  { id: 101, location: 'Zona 1', description: 'Bache en Calle 10', status: 'Pendiente', date: '2025-09-24' },
  { id: 102, location: 'Zona 1', description: 'Bache en Calle 10', status: 'Programada', date: '2025-09-24' },
  { id: 103, location: 'Zona 1', description: 'Bache en Calle 10', status: 'Atendida', date: '2025-09-24' },
  { id: 104, location: 'Zona 1', description: 'Bache en Calle 10', status: 'Pendiente', date: '2025-09-24' },
  { id: 105, location: 'Zona 1', description: 'Bache en Calle 10', status: 'Programada', date: '2025-09-24' },
];

function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mantenimiento Urbano</h1>
          <p className="text-gray-600">Gestión Municipal</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="Ingrese su usuario"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="Ingrese su contraseña"
            />
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
          >
            Iniciar Sesión
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-green-600 hover:text-green-700">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    pending: 18,
    scheduled: 12,
    completed: 20
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendiente': return 'text-orange-600 bg-orange-50';
      case 'Programada': return 'text-blue-600 bg-blue-50';
      case 'Atendida': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Mantenimiento Urbano</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar solicitudes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button className="p-2 hover:bg-green-400 rounded-lg transition">
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-700 font-semibold">U</span>
              </div>
              <span className="text-gray-700 font-medium">username</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white min-h-screen shadow-sm p-4">
          <nav className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
              Dashboard
            </button>
            <button 
              onClick={() => onNavigate('requests')}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg text-gray-700"
            >
              Solicitudes
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg text-gray-700">
              Estadísticas
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg text-gray-700">
              Finanzas
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-500">Pendientes</span>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">{stats.pending}</div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                Ver detalles <ChevronRight size={16} />
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-500">Programadas</span>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">{stats.scheduled}</div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                Ver detalles <ChevronRight size={16} />
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-500">Atendidas</span>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">{stats.completed}</div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                Ver detalles <ChevronRight size={16} />
              </a>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => onNavigate('register')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
            >
              Registrar solicitud
            </button>
            <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium">
              Consultar
            </button>
            <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium">
              Programar
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ubicación</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Descripción</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Fecha</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dashboardData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                    <td className="px-6 py-4">
                      <button className="text-sm text-gray-900 hover:text-blue-600 font-medium">
                        Programar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

function RequestsList({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [dateFilter, setDateFilter] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendiente': return 'bg-blue-500';
      case 'En revisión': return 'bg-yellow-500';
      case 'Urgente': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Mantenimiento Urbano</h1>
        </div>
      </header>

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
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ubicación</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Descripción</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {initialRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{request.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{request.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-4 py-2 rounded-full text-white text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Mostrando 1-5 de 42 resultados
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
          >
            Volver al Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

function RegisterRequest({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [useMap, setUseMap] = useState(true);
  const [location, setLocation] = useState('Ej : 5a avenida 3-45, Zona 1, Guatemala');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    alert('Solicitud registrada exitosamente');
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Mantenimiento Urbano</h1>
          <button className="px-4 py-2 bg-white rounded-lg shadow-sm">
            <Search size={20} />
          </button>
        </div>
      </header>

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
              onClick={() => onNavigate('dashboard')}
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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  switch (currentView) {
    case 'dashboard':
      return <Dashboard onNavigate={handleNavigate} />;
    case 'requests':
      return <RequestsList onNavigate={handleNavigate} />;
    case 'register':
      return <RegisterRequest onNavigate={handleNavigate} />;
    default:
      return <Dashboard onNavigate={handleNavigate} />;
  }
}