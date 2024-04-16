import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestionById, updateQuestion } from "../../../utils/QuizService";

const UpdateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const questionToUpdate = await getQuestionById(id);
      if (questionToUpdate) {
        setQuestion(questionToUpdate.question);
        setChoices(questionToUpdate.choices);
        setCorrectAnswers(questionToUpdate.correctAnswers);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChoiceChange = (index, e) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = e.target.value;
    setChoices(updatedChoices);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswers(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedQuestion = {
        question,
        choices,
        correctAnswers: correctAnswers
          .toString()
          .split(",")
          .map((answer) => answer.trim()),
      };
      await updateQuestion(id, updatedQuestion);
      navigate("/all-quizzes");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto ml-12 my-8 flex flex-col justify-center items-center">
  <h4 className="mb-5 text-gray-600 text-3xl font-semibold ">Update Quiz Question</h4>
  <hr />
  <div className="flex flex-col">
    <form onSubmit={handleUpdate} className="w-full max-w-md">
      <div className="mb-4">
        <label className="text-xl text-blue-500 block">Question:</label>
        <textarea
          className="border rounded-md p-2 mt-1 w-full outline-none"
          rows={4}
          value={question}
          onChange={handleQuestionChange}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="text-xl block text-orange-500">Choices:</label>
        {choices.map((choice, index) => (
          <input
            key={index}
            type="text"
            className="border rounded-md p-2 mt-2 w-full outline-none"
            value={choice}
            onChange={(e) => handleChoiceChange(index, e)}
          />
        ))}
      </div>
      <div className="mb-4">
        <label className="text-lg block text-green-500">Correct Answer(s):</label>
        <input
          type="text"
          className="border rounded-md p-2 mt-1 w-full outline-none"
          value={correctAnswers}
          onChange={handleCorrectAnswerChange}
        />
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-yellow-500 p-2 m-2 text-white cursor-pointer hover:bg-yellow-600 py-2 px-4 rounded-md mr-2"
        >
          Update question
        </button>
        <Link
          to={"/all-quizzes"}
          className="bg-red-500 p-2 m-2 text-white cursor-pointer hover:bg-red-600 py-2 px-4 rounded-md"
        >
          Back to all questions
        </Link>
      </div>
    </form>
  </div>
</div>

  );
};

export default UpdateQuestion;
