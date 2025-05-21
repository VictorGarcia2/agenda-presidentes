import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../firebase/config';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    nombreHermano: '',
    motivo: '',
    fecha: '',
    hora: '',
    presidenteAsignado: '',
    estado: 'pendiente'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const citasRef = ref(database, 'citas');
      await push(citasRef, formData);
      alert('Solicitud enviada con éxito');
      setFormData({
        nombreHermano: '',
        motivo: '',
        fecha: '',
        hora: '',
        presidenteAsignado: '',
        estado: 'pendiente'
      });
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Error al enviar la solicitud');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8 text-center">
        Solicitar Cita
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label htmlFor="nombreHermano" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors">
            Nombre Completo
          </label>
          <input
            type="text"
            id="nombreHermano"
            name="nombreHermano"
            value={formData.nombreHermano}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out placeholder-gray-400 hover:border-gray-300"
            placeholder="Ingrese su nombre completo"
          />
        </div>

        <div className="group">
          <label htmlFor="motivo" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors">
            Motivo de la Cita
          </label>
          <textarea
            id="motivo"
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out placeholder-gray-400 hover:border-gray-300"
            rows="3"
            placeholder="Describa brevemente el motivo de su cita"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors">
              Fecha Preferida
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out hover:border-gray-300"
            />
          </div>

          <div className="group">
            <label htmlFor="hora" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors">
              Hora Preferida
            </label>
            <input
              type="time"
              id="hora"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out hover:border-gray-300"
            />
          </div>
        </div>

        <div className="group">
          <label htmlFor="presidenteAsignado" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors">
            Presidente con quien desea hablar
          </label>
          <select
            id="presidenteAsignado"
            name="presidenteAsignado"
            value={formData.presidenteAsignado}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out hover:border-gray-300"
          >
            <option value="">Seleccione una opción</option>
            <option value="Presidente">Presidente</option>
            <option value="1er Consejero">1er Consejero</option>
            <option value="2do Consejero">2do Consejero</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] font-medium shadow-lg shadow-indigo-500/25"
        >
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
}