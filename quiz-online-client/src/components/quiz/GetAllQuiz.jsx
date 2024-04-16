import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "../../../utils/QuizService";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const GetAllQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState("");

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const data = await getAllQuestions();
            setQuestions(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteQuestion = async (id) => {
        try {
            await deleteQuestion(id);
            setQuestions(questions.filter((question) => question.id !== id));
            setIsQuestionDeleted(true);
            setDeleteSuccess("Question deleted successfully.");
        } catch (error) {
            console.error(error);
        }
        setTimeout(() => {
            setDeleteSuccess("");
        }, 4000);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <section className="mx-auto px-8">
            <div className="flex justify-between items-center mt-5">
                <div className="mb-2 md:mb-0">
                    <h4 className="text-md text-gray-500">All Quiz Questions</h4>
                </div>
                <div>
                    <Link to="/create-quiz" className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg">
                        <FaPlus className="w-4 h-4 mr-1" />
                        Add Question
                    </Link>
                </div>
            </div>
            <hr className="my-4" />
            {isQuestionDeleted && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-4">{deleteSuccess}</div>}
            {questions.map((question, index) => (
                <div key={question.id} className="my-4">
                    <pre>
                        <h4 className="text-gray-500 text-xl">{`${index + 1}. ${question.question}`}</h4>
                    </pre>
                    <ul className="list-disc pl-6">
                        {question.choices.map((choice, index) => (
                            <li key={index}>{choice}</li>
                        ))}
                    </ul>
                    <p className="text-green-500">Correct Answer: {question.correctAnswers}</p>
                    <div className="flex mt-2">
                        <Link to={`/update-quiz/${question.id}`} className="bg-green-500 p-1 m-2 rounded text-white cursor-pointer hover:bg-green-600">Edit Question</Link>
                        <button className="bg-red-500 p-1 m-2 rounded text-white cursor-pointer hover:bg-red-600" onClick={() => handleDeleteQuestion(question.id)}>Delete Question</button>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default GetAllQuiz;
