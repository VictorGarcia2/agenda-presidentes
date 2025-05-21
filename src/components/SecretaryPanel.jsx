import { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { database } from '../firebase/config';

export default function SecretaryPanel() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const citasRef = ref(database, 'citas');
    const unsubscribe = onValue(citasRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const citasArray = Object.entries(data).map(([id, cita]) => ({
          id,
          ...cita
        }));
        setCitas(citasArray);
      } else {
        setCitas([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const actualizarEstadoCita = async (citaId, nuevoEstado) => {
    try {
      const citaRef = ref(database, `citas/${citaId}`);
      await update(citaRef, { estado: nuevoEstado });
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      alert('Error al actualizar el estado de la cita');
    }
  };

  const generarMensajeHermano = (cita) => {
    return `Hola ${cita.nombreHermano}, te confirmamos tu cita con el ${cita.presidenteAsignado} para tratar el siguiente tema: "${cita.motivo}". La cita está agendada para el día ${cita.fecha} a las ${cita.hora}. Por favor llega puntual. ¡Gracias! 🙏`;
  };

  const copiarMensaje = (mensaje) => {
    navigator.clipboard.writeText(mensaje)
      .then(() => alert('Mensaje copiado al portapapeles'))
      .catch(err => console.error('Error al copiar:', err));
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">Panel del Secretario</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {citas.map(cita => (
          <div key={cita.id} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-semibold text-lg text-gray-800">{cita.nombreHermano}</h3>
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${cita.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : cita.estado === 'confirmada' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-blue-100 text-blue-800 border border-blue-200'}`}>
                {cita.estado}
              </span>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <strong className="text-gray-700">Motivo:</strong>
                <span className="flex-1">{cita.motivo}</span>
              </p>
              <p className="flex items-center gap-2">
                <strong className="text-gray-700">Fecha:</strong>
                <span>{cita.fecha}</span>
              </p>
              <p className="flex items-center gap-2">
                <strong className="text-gray-700">Hora:</strong>
                <span>{cita.hora}</span>
              </p>
              <p className="flex items-center gap-2">
                <strong className="text-gray-700">Presidente:</strong>
                <span>{cita.presidenteAsignado}</span>
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {cita.estado === 'pendiente' && (
                <button
                  onClick={() => actualizarEstadoCita(cita.id, 'confirmada')}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] font-medium shadow-lg shadow-green-500/25"
                >
                  Confirmar Cita
                </button>
              )}
              
              {cita.estado === 'confirmada' && (
                <>
                  <button
                    onClick={() => copiarMensaje(generarMensajeHermano(cita))}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] font-medium shadow-lg shadow-indigo-500/25"
                  >
                    Copiar Mensaje para Hermano
                  </button>
                  <button
                    onClick={() => actualizarEstadoCita(cita.id, 'completada')}
                    className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-xl hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] font-medium shadow-lg shadow-gray-500/25"
                  >
                    Marcar como Completada
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}