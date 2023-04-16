import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import EmployeeList from './components/Employees/EmployeeList';
import ProblemList from './components/Problems/ProblemList';
import HeatMap from './components/HeatMap/HeatMap';

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await (await fetch('http://localhost:8000/user')).json()
      setUsers(data)
    }

    fetchUsers()
  }, [])

  return (
    <>
      <Header />
      <div className="bg-bluenormal h-screen">
        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full overflow-y-auto">
          <div className="bg-white ml-2 rounded-xl flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold text-bluenormal mb-8">Ale to Ty dzwonisz?!</h1>
            <h2 className="text-2xl text-bluenormal font-medium">Magazyn 4.0</h2>
          </div>
          <div className="bg-white mr-2 rounded-xl flex flex-col">
            <EmployeeList employees={users} />
          </div>
          <div className="bg-white ml-2 rounded-xl flex flex-col mb-2">
            <ProblemList />
          </div>
          <div className="bg-white mr-2 rounded-xl flex flex-col mb-2 justify-center items-center">
            <h2 className="text-lg font-nunitobold mb-4 text-center mt-6">Heatmapa</h2>
            <HeatMap />
          </div>

        </div>
      </div>
    </>
  );
};

export default App;
