import React, { useState } from 'react';
import EmployeeModal from './EmployeeModal';

const employees = [
    {
      user_id: 1,
      name: 'John',
      last_name: 'Smith',
      assigned: false,
      records: []
    },
    {
      user_id: 2,
      name: 'Emma',
      last_name: 'Johnson',
      assigned: false,
      records: []
    },
    {
      user_id: 3,
      name: 'James',
      last_name: 'Williams',
      assigned: false,
      records: []
    },
    {
      user_id: 4,
      name: 'Olivia',
      last_name: 'Brown',
      assigned: false,
      records: []
    },
    {
      user_id: 5,
      name: 'William',
      last_name: 'Jones',
      assigned: false,
      records: []
    },
    {
      user_id: 6,
      name: 'Ava',
      last_name: 'Garcia',
      assigned: false,
      records: []
    },
    {
      user_id: 7,
      name: 'Henry',
      last_name: 'Miller',
      assigned: false,
      records: []
    },
    {
      user_id: 8,
      name: 'Sophia',
      last_name: 'Davis',
      assigned: false,
      records: []
    },
    {
      user_id: 9,
      name: 'Daniel',
      last_name: 'Rodriguez',
      assigned: false,
      records: []
    },
    {
      user_id: 10,
      name: 'Isabella',
      last_name: 'Martinez',
      assigned: false,
      records: [1, 2, 3]
    }
  ];
  

const EmployeeList = () => {
    const [showModal, setShowModal] = useState(false)
    const [employee, setEmployee] = useState({id: null, name: null})

    const handleEmployeeClick = (employee) => {
        setEmployee(employee)

        setShowModal(true)
    }

    return (
        <div className="h-full flex flex-col p-4">
            <h2 className="text-lg font-nunitobold mb-4 text-center">Pracownicy</h2>
            <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                {employees.map((employee) => (
                    <li key={employee.id} className="py-4 hover:shadow-xl active:scale-95 transition duration-150 cursor-pointer" onClick={()=>handleEmployeeClick(employee)}>
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-bluelight"></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-900 font-nunitobold">{employee.name} {employee.last_name}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {showModal ? <EmployeeModal setShowModal={setShowModal} employee={employee}/> : null}
        </div>

    );
};

export default EmployeeList;
