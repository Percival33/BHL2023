import React, { useState } from 'react';
import EmployeeModal from './EmployeeModal';

const employees = [
    { id: 1, name: 'John Smith'},
    { id: 2, name: 'Jane Doe'},
    { id: 3, name: 'Bob Johnson' },
    { id: 4, name: 'Lisa Brown' },
    { id: 5, name: 'Tom Wilson' },
];

const EmployeeList = () => {
    const [showModal, setShowModal] = useState(false)
    console.log(showModal)

    return (
        <div className="bg-bluesuperlight h-full flex flex-col p-4">
            <h2 className="text-lg font-bold mb-4">Pracownicy</h2>
            <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                {employees.map((employee) => (
                    <li key={employee.id} className="py-4" onClick={()=>setShowModal(true)}>
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-bluelight"></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-900 font-medium">{employee.name}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {showModal ? <EmployeeModal setShowModal={setShowModal}/> : null}
        </div>

    );
};

export default EmployeeList;
