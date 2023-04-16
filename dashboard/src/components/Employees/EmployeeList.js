import React, { useState } from 'react';
import EmployeeModal from './EmployeeModal';

const employees = [
    { id: 1, name: 'John Smith'},
    { id: 2, name: 'Jane Doe'},
    { id: 3, name: 'Bob Johnson' },
    { id: 4, name: 'Lisa Brown' },
    { id: 5, name: 'Tom Wilson' },
    { id: 6, name: 'John Smith'},
    { id: 7, name: 'Jane Doe'},
    { id: 8, name: 'Bob Johnson' },
    { id: 9, name: 'Lisa Brown' },
    { id: 10, name: 'Tom Wilson' },
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
                                <p className="text-gray-900 font-nunitobold">{employee.name}</p>
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
