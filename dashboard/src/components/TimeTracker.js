import React, { useState } from 'react';

const TimeTracker = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Jan Kowalski', time: 0 },
    { id: 2, name: 'Anna Nowak', time: 0 },
    { id: 3, name: 'Tomasz Wiśniewski', time: 0 },
  ]);
  const [currentEmployee, setCurrentEmployee] = useState('');
  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    setTimer(setInterval(() => {
      setEmployees(prevEmployees => prevEmployees.map(employee => {
        if (employee.name === currentEmployee) {
          return { ...employee, time: employee.time + 1 };
        }
        return employee;
      }));
    }, 1000));
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center mt-4 mb-8">Śledzenie czasu pracy pracowników</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:mr-4">
          <h2 className="text-lg font-bold mb-4">Lista pracowników</h2>
          <ul className="list-disc ml-4">
            {employees.map(employee => (
              <li key={employee.id} className="mb-2">
                <span className="font-bold">{employee.name}</span> - {employee.time} sekund
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-lg font-bold mb-4">Panel śledzenia czasu pracy</h2>
          <div className="flex flex-col md:flex-row items-center">
            <select
              value={currentEmployee}
              onChange={e => setCurrentEmployee(e.target.value)}
              className="w-full md:w-auto px-4 py-2 mb-4 md:mb-0 md:mr-4 bg-gray-100 rounded-md shadow-inner focus:outline-none focus:shadow-outline-blue"
            >
              <option value="">Wybierz pracownika</option>
              {employees.map(employee => (
                <option key={employee.id} value={employee.name}>{employee.name}</option>
              ))}
            </select>
            {timer ?
              <button onClick={stopTimer} className="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:shadow-outline-red">
                STOP
              </button>
              :
              <button onClick={startTimer} disabled={!currentEmployee} className="w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:shadow-outline-green">
                START
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;
