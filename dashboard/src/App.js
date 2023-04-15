import React from 'react';
import Header from './components/Header/Header';
import OrderChart from './components/OrderChart/OrderChart';
import EmployeeList from './components/Employees/EmployeeList';
import ProblemList from './components/Problems/ProblemList';


const App = () => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-2 grid-rows-2 gap-2 h-screen">
        <div className="bg-bluesuperlight"><EmployeeList /></div>
        <div className="bg-bluelight"><OrderChart/></div>
        <div className="bg-bluelight"></div>
        <div className="bg-bluesuperlight"><ProblemList /></div>
      </div>
    </>
  );
};

export default App;
