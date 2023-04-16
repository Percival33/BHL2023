import React, { useState } from 'react';
import ProblemModal from './ProblemModal';
import ProblemSolved from './ProblemSolved';
import ProblemNotSolved from './ProblemNotSolved';

const ProblemList = () => {
  const [problems, setProblems] = useState([
    {
      item_id: '1',
      worker_id: 'John Doe',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2022-04-18',
      state: 'reported',
      solved: false
    },
    {
      item_id: '2',
      worker_id: 'Jane Smith',
      comment: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
      date: '2022-04-17',
      state: 'reported',
      solved: false
    },
    {
      item_id: '3',
      worker_id: 'Bob Johnson',
      comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      date: '2022-04-16',
      state: 'reported',
      solved: false
    },
    {
      item_id: '4',
      worker_id: 'John Doe',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2022-04-18',
      state: 'reported',
      solved: false
    },
    {
      item_id: '5',
      worker_id: 'Jane Smith',
      comment: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
      date: '2022-04-17',
      state: 'reported',
      solved: false
    },
    {
      item_id: '6',
      worker_id: 'Bob Johnson',
      comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      date: '2022-04-16',
      state: 'reported',
      solved: false
    },
  ])
  const [showModal, setShowModal] = useState(false)
  const [problem, setProblem] = useState({
    item_id: null,
    worker_id: null,
    comment: null,
    date: null,
    state: null,
    solved: null
  },)

  const handleProblemCheck = (problem) => {
    setProblem(problem)

    setShowModal(true)
  }

  const handleProblemSolve = (problem) => {
    setProblem(problem)

    setProblems(prevProblems => {
      return prevProblems.map(p => {
        if (p.item_id === problem.item_id) {
          return { ...p, state: !problem.state };
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
            {problem.state ? <ProblemSolved problem={problem} handleProblemSolve={handleProblemSolve} handleProblemCheck={handleProblemCheck} />
              : <ProblemNotSolved problem={problem} handleProblemSolve={handleProblemSolve} handleProblemCheck={handleProblemCheck} />}
          </>
        ))}

      </ul>
      {showModal ? <ProblemModal setShowModal={setShowModal} problem={problem} /> : null}
    </div>

  );
};

export default ProblemList;
