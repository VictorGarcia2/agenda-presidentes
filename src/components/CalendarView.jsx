import { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase/config';

// Configurar el localizador para el calendario
const localizer = dayjsLocalizer(dayjs);

// Mensajes en español para el calendario
const messages = {
  allDay: 'Todo el día',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay citas en este rango.',
};

export default function CalendarView() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const citasRef = ref(database, 'citas');
    const unsubscribe = onValue(citasRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convertir las citas a eventos para el calendario
        const eventosCalendario = Object.entries(data).map(([id, cita]) => {
          const [year, month, day] = cita.fecha.split('-').map(Number);
          const [hours, minutes] = cita.hora.split(':').map(Number);
          
          const start = new Date(year, month - 1, day, hours, minutes);
          const end = new Date(year, month - 1, day, hours + 1, minutes); // Por defecto 1 hora de duración

          return {
            id,
            title: `${cita.nombreHermano} - ${cita.motivo}`,
            start,
            end,
            resource: cita.presidenteAsignado,
            estado: cita.estado
          };
        });
        setEvents(eventosCalendario);
      } else {
        setEvents([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Personalizar el estilo de los eventos según su estado
  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad'; // Color por defecto

    switch (event.estado) {
      case 'pendiente':
        backgroundColor = '#fbbf24'; // Amarillo para pendiente
        break;
      case 'confirmada':
        backgroundColor = '#34d399'; // Verde para confirmada
        break;
      case 'completada':
        backgroundColor = '#6b7280'; // Gris para completada
        break;
      default:
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  return (
    <div className="h-[800px] p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
        tooltipAccessor={event => `${event.title}\nPresidente: ${event.resource}\nEstado: ${event.estado}`}
        className="h-full"
      />
    </div>
  );
}