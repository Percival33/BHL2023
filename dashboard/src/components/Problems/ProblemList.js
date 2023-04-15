import React, { useState } from 'react';
import ProblemModal from './ProblemModal';
import { MoonIcon } from '@heroicons/react/outline';

const ProblemList = () => {
  const [problems, setProblems] = useState([
    {
      id: 1,
      author: 'John Doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2022-04-18',
      solved: false
    },
    {
      id: 2,
      author: 'Jane Smith',
      content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
      date: '2022-04-17',
      solved: false
    },
    {
      id: 3,
      author: 'Bob Johnson',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      date: '2022-04-16',
      solved: false
    },
  ])
  const [showModal, setShowModal] = useState(false)
  const [problem, setProblem] = useState({
    id: null,
    author: null,
    content: null,
    date: null,
    solved: false
  },)

  const handleProblemCheck = (problem) => {
    setProblem(problem)

    setShowModal(true)
  }

  const handleProblemSolve = (problem) => {
    setProblem(problem)

    setProblems(prevProblems => {
      return prevProblems.map(p => {
        if (p.id === problem.id) {
          return { ...p, solved: !problem.solved };
        } else {
          return p;
        }
      });
    });
  }

  return (
    <div className="h-full flex flex-col p-4">
      <h2 className="text-lg font-nunitobold mb-4 ml-24">Problemy</h2>
      <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
        {problems.map((problem) => (
          <li key={problem.id} className="py-4 transition flex items-center">
            <div className="mr-4">
              {/* {problem.solved ?
                <MoonIcon className="h-[1em] w-auto mr-1 stroke-white" />
                : <button className="px-4 py-2 rounded-full bg-green-500 text-white font-semibold text-sm lg:text-base" onClick={() => handleProblemSolve(problem)}>
                  Accept
                </button>} TODO!!! */}

            </div>
            <div className="flex flex-col space-y-2 flex-1 duration-150 cursor-pointer active:scale-95" onClick={() => handleProblemCheck(problem)}>
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
