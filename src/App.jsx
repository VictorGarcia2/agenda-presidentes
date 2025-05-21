import { useState } from 'react';
import AppointmentForm from './components/AppointmentForm';
import SecretaryPanel from './components/SecretaryPanel';
import PresidentCalendar from './components/PresidentCalendar';

function App() {
  const [currentView, setCurrentView] = useState('appointment');

  const renderView = () => {
    switch (currentView) {
      case 'appointment':
        return <AppointmentForm />;
      case 'secretary':
        return <SecretaryPanel />;
      case 'calendar':
        return <PresidentCalendar />;
      default:
        return <AppointmentForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Agenda Presidencia
                </h1>
              </div>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                <button
                  onClick={() => setCurrentView('appointment')}
                  className={`${currentView === 'appointment' ? 'border-indigo-500 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 hover:bg-gray-50/50'} inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium rounded-t-lg transition-all duration-200 ease-in-out`}
                >
                  Solicitar Cita
                </button>
                <button
                  onClick={() => setCurrentView('secretary')}
                  className={`${currentView === 'secretary' ? 'border-indigo-500 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 hover:bg-gray-50/50'} inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium rounded-t-lg transition-all duration-200 ease-in-out`}
                >
                  Panel del Secretario
                </button>
                <button
                  onClick={() => setCurrentView('calendar')}
                  className={`${currentView === 'calendar' ? 'border-indigo-500 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 hover:bg-gray-50/50'} inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium rounded-t-lg transition-all duration-200 ease-in-out`}
                >
                  Calendario
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="transition-all duration-300 ease-in-out">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;
