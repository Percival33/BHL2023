import React, { useState } from 'react';

const EmployeeList = ({employees}) => {
    return (
        <div className="h-full flex flex-col p-4">
            <h2 className="text-lg font-nunitobold mb-4 text-center">Pracownicy</h2>
            <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                {employees.map((employee) => (
                    <li key={employee.id} className="py-4 hover:shadow-xl active:scale-95 transition duration-150 cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-bluelight"></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-900 font-nunitobold">{employee.name} {employee.last_name}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default EmployeeList;
