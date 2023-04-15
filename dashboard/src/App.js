import React from 'react';
import Header from './components/Header/Header';
import EmployeeList from './components/EmployeeList/EmployeeList';
import ProblemList from './components/ProblemList/ProblemList';

const App = () => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-2 grid-rows-2 gap-2 h-screen">

        <div className="bg-blue-400"><EmployeeList/></div>
        <div className="bg-blue-500"></div>
        <div className="bg-blue-300"></div>
        <div className="bg-blue-200"><ProblemList/></div>
      </div>
    </>

  );
};

export default App;
