import React, { useState } from 'react';
import ProblemModal from './ProblemModal';

const problems = [
  {
    id: 1,
    author: 'John Doe',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: '2022-04-18',
  },
  {
    id: 2,
    author: 'Jane Smith',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
    date: '2022-04-17',
  },
  {
    id: 3,
    author: 'Bob Johnson',
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    date: '2022-04-16',
  },
];

const ProblemList = () => {
  const [showModal, setShowModal] = useState(false)
  const [problem, setProblem] = useState({
    id: null,
    author: null,
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    date: '2022-04-16',
  },)

  const handleProblemClick = (problem) => {
    setProblem(problem)

    setShowModal(true)
  }

  return (
    <div className="bg-bluesuperlight h-full flex flex-col p-4">
      <h2 className="text-lg font-nunitobold mb-4">Problemy</h2>
      <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
        {problems.map((problem) => (
          <li
            key={problem.id}
            className="py-4 active:scale-95 transition duration-150 cursor-pointer flex items-center justify-between"
            onClick={handleProblemClick}
          >
            <button className="px-4 py-2 rounded-full bg-green-500 text-white font-semibold text-sm lg:text-base">
              OK
            </button>
            <div className="flex flex-col space-y-2 flex-1 ml-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-900 font-nunitobold">{problem.author}</p>
                <p className="text-gray-500 text-sm">{problem.date}</p>
              </div>
              <p className="text-gray-800">{problem.content}</p>
            </div>
          </li>
        ))}
      </ul>
      {showModal ? <ProblemModal setShowModal={setShowModal} problem={problem} /> : null}
    </div>

  );
};

export default ProblemList;
