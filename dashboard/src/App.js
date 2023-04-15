import React from 'react';
import Header from './components/Header/Header';
import OrderChart from './components/OrderChart/OrderChart';
import EmployeeList from './components/Employees/EmployeeList';
import ProblemList from './components/Problems/ProblemList';
import HeatMap from './components/HeatMap/HeatMap';

const App = () => {
  return (
    <>
      <Header />
      <div className="bg-bluenormal h-screen">
        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full overflow-y-auto">
          <div className="bg-white ml-2 rounded-xl flex flex-col justify-center items-center">
            <OrderChart />
          </div>
          <div className="bg-white mr-2 rounded-xl flex flex-col">
            <EmployeeList />
          </div>
          <div className="bg-white ml-2 rounded-xl flex flex-col mb-2">
            <ProblemList />
          </div>
          <div className="bg-white mr-2 rounded-xl flex flex-col mb-2 justify-center items-center">
            <h2 className="text-lg font-nunitobold mb-4 text-center">Problemy</h2>
            <HeatMap />
          </div>

        </div>
      </div>
    </>
  );
};

export default App;
