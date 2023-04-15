import React from 'react';

const employees = [
    { id: 1, name: 'John Smith'},
    { id: 2, name: 'Jane Doe'},
    { id: 3, name: 'Bob Johnson' },
    { id: 4, name: 'Lisa Brown' },
    { id: 5, name: 'Tom Wilson' },
];

const EmployeeList = () => {
    return (
        <div className="bg-gray-100 h-full flex flex-col p-4 lg:w-1/2 xl:w-1/3 w-full">
            <h2 className="text-lg font-bold mb-4">Pracownicy</h2>
            <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                {employees.map((employee) => (
                    <li key={employee.id} className="py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-400"></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-900 font-medium">{employee.name}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default EmployeeList;
