import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, User, MapPin, ArrowLeft } from "lucide-react";

const ProgramarSolicitud: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 🔹 Obtiene el ID de la URL (/programar/:id)
  const navigate = useNavigate(); // 🔹 Permite volver al dashboard o moverse entre rutas

  const solicitudId = Number(id); // Convertimos el id a número

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [cuadrilla, setCuadrilla] = useState(""); 
  const [recursos, setRecursos] = useState(""); 
  const [observaciones, setObservaciones] = useState("");

  const handleSubmit = async () => {
    if (!fecha || !hora || !cuadrilla) {
      alert(" Por favor completa todos los campos requeridos.");
      return;
    }

    const payload = {
      solicitudId,
      fechaProgramada: fecha,
      horaProgramada: hora,
      cuadrillaAsignada: cuadrilla, 
      recursosRequeridos: recursos, 
      observaciones,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/mantenimiento/solicitudes/${solicitudId}/programar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert(" Solicitud programada correctamente.");
        navigate("/dashboard");
      } else {
        alert(" Error al programar la solicitud.");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert(" No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Encabezado */}
      <header className="bg-green-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
           <h1 className="text-2xl font-bold text-gray-800">
        Programar Solicitud #{solicitudId}
           </h1>
          <button
          onClick={() => navigate("/solicitudes")} 
          className="flex items-center text-gray-700 hover:text-blue-600 font-medium"
            >
          <ArrowLeft className="mr-2" /> Volver a Solicitudes Pendientes
         </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-4xl mx-auto mt-8 bg-white p-8 rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Detalles de programación
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de mantenimiento
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Calendar className="text-gray-400 mr-2" />
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Hora */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora programada
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Clock className="text-gray-400 mr-2" />
              <input
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>

         {/* -------------------- CAMPO CUADRILLA (Reemplaza a Responsable) -------------------- */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
        Cuadrilla asignada
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              {/* Aquí puedes usar un ícono de usuario o equipo */}
              <input
            type="text"
            placeholder="Ej: Cuadrilla Central A"
            value={cuadrilla}
            onChange={(e) => setCuadrilla(e.target.value)}
            className="w-full outline-none"
                     />
                  </div>
              </div>

{/* -------------------- CAMPO RECURSOS (Nuevo, según CU-03) -------------------- */}
      <div>
       <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
        Recursos / Materiales
        </label>
         <textarea
         rows={3}
         placeholder="Ej: 5mts cable THHN, 1 caja de herramientas, Escalera de 6m"
         value={recursos}
          onChange={(e) => setRecursos(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
             />
          </div>

          {/* El campo Observaciones puede quedar igual, usando el estado 'observaciones' */}
          {/* Lugar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lugar o zona
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <MapPin className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Ej: Zona 1, 5a avenida..."
                className="w-full outline-none"
              />
            </div>
          </div>
        </div>

        {/* Observaciones */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones
          </label>
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Notas adicionales o instrucciones específicas..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
            rows={4}
          ></textarea>
        </div>

        {/* Botones */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow"
          >
            Programar solicitud
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProgramarSolicitud;
