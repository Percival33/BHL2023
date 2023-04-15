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
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          <div className="bg-white h-full flex justify-center items-center ml-2"><OrderChart/></div>
          <div className="bg-white mr-2"><EmployeeList /></div>
          <div className="bg-white ml-2"><ProblemList /></div>
          <div className="bg-white h-full flex justify-center items-center mr-2"><HeatMap/></div>
        </div>
      </div>
    </>
  );
};

export default App;


