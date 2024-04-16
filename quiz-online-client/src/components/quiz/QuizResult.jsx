import React from "react";
import { useLocation,NavLink } from "react-router-dom";

const QuizResult = () => {
    const location = useLocation();
    const { quizQuestions, totalScores } = location.state;
    const numQuestions = quizQuestions.length;
    const percentage = Math.round((totalScores / numQuestions) * 100);

    const handleRetakeQuiz = () => {
        alert("Oops! This functionality was not implemented!");
    };

    return (
        <section className="mt-5 flex flex-col items-center justify-center">
            <h3 className="text-3xl font-semibold mb-4">Your Quiz Result Summary</h3>
            <hr className="w-full mb-4" />
            <h5 className="text-xl mb-2 text-blue-400 font-semibold">
                You answered {totalScores} out of {numQuestions} questions correctly.
            </h5>
            <p className="mb-4 text-lg font-medium">Your total score is {percentage}%.</p>

            <button className="bg-blue-500 p-2 m-2 rounded text-white cursor-pointer hover:bg-blue-600" onClick={handleRetakeQuiz}>
                Retake this quiz
            </button>
			<NavLink to="/admin" className="bg-green-500 p-3 m-2 rounded text-white cursor-pointer hover:bg-green-600 ">Back To Admin</NavLink>
        </section>
    );
};

export default QuizResult;
