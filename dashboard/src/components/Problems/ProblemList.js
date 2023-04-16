import React, { useEffect, useRef, useState } from 'react';
import ProblemModal from './ProblemModal';
import ProblemSolved from './ProblemSolved';
import ProblemNotSolved from './ProblemNotSolved';

const ProblemList = () => {
  const [problems, setProblems] = useState([])
  const wsHandler = useRef(null);

  useEffect(() => {
    const fetchProblems = async () => {
      const data = await (await fetch('http://localhost:8000/defect')).json()
      console.log(data)
      setProblems(data)
    }
    fetchProblems()
  }, [])

  if(wsHandler.current === null){
    wsHandler.current = new WebSocket("ws://localhost:8000/user/dashboard/1")

    wsHandler.onmessage = function(event) {
      console.log(event, 'test')
    };
  }

  //let socket = new WebSocket("ws://localhost:8000/...TODO");


  const [showModal, setShowModal] = useState(false)
  const [problem, setProblem] = useState(null)

  const handleProblemCheck = (problem) => {
    setProblem(problem)

    setShowModal(true)
  }

  const handleProblemSolve = (problem) => {
    setProblem(problem)

    setProblems(prevProblems => {
      return prevProblems.map(p => {
        if (p._id === problem._id) {
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
