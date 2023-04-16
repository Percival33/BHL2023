import React, { useState } from 'react';
import ProblemModal from './ProblemModal';
import ProblemSolved from './ProblemSolved';
import ProblemNotSolved from './ProblemNotSolved';

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
    {
      id: 4,
      author: 'John Doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2022-04-18',
      solved: false
    },
    {
      id: 5,
      author: 'Jane Smith',
      content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
      date: '2022-04-17',
      solved: false
    },
    {
      id: 6,
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
      <h2 className="text-lg font-nunitobold mb-4 text-center">Usterki</h2>
      <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
        {problems.map((problem) => (
          <>
            {problem.solved ? <ProblemSolved problem={problem} handleProblemSolve={handleProblemSolve} handleProblemCheck={handleProblemCheck} />
              : <ProblemNotSolved problem={problem} handleProblemSolve={handleProblemSolve} handleProblemCheck={handleProblemCheck} />}
          </>
        ))}

      </ul>
      {showModal ? <ProblemModal setShowModal={setShowModal} problem={problem} /> : null}
    </div>

  );
};

export default ProblemList;
