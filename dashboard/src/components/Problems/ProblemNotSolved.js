import React from 'react'

const ProblemNotSolved = ({ problem, handleProblemSolve, handleProblemCheck }) => {

    const date = new Date(problem.date);

    return (
        <div>
            <li key={problem.id} className="py-4 transition flex items-center bg-bluesuperlight px-4 rounded-xl my-2">
                <div className="mr-4">
                    <button
                        className="px-4 py-2 rounded-full bg-bluenormal text-white font-semibold text-sm lg:text-base duration-150 cursor-pointer active:scale-90"
                        onClick={() => handleProblemSolve(problem)}
                    >
                        Zrobione
                    </button>
                </div>
                <div className="flex flex-col space-y-2 flex-1 duration-150 cursor-pointer active:scale-95" onClick={() => handleProblemCheck(problem)}>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-900 font-nunitobold">{problem.comment}</p>
                        <p className="text-gray-500 text-sm">{date.toLocaleDateString()}</p>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default ProblemNotSolved