import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { fetchQuizForUser } from "../../../utils/QuizService"
import AnswerOptions from "../../../utils/AnswerOptions"

const Quiz = () => {
	const [quizQuestions, setQuizQuestions] = useState([
		{ id: "", correctAnswers: "", question: "", questionType: "" }
	])
	const [selectedAnswers, setSelectedAnswers] = useState([{ id: "", answer: "" }])
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [totalScores, setTotalScores] = useState(0)
	const location = useLocation()
	const navigate = useNavigate()
	const { selectedSubject, selectedNumQuestions } = location.state
	useEffect(() => {
		fetchQuizData()
	}, [])

	const fetchQuizData = async () => {
		if (selectedNumQuestions && selectedSubject) {
			const questions = await fetchQuizForUser(selectedNumQuestions, selectedSubject)
			setQuizQuestions(questions)
		}
	}

	const handleAnswerChange = (questionId, answer) => {
		setSelectedAnswers((prevAnswers) => {
			const existingAnswerIndex = prevAnswers.findIndex((answerObj) => answerObj.id === questionId)
			const selectedAnswer = Array.isArray(answer)
				? answer.map((a) => a.charAt(0))
				: answer.charAt(0)

			if (existingAnswerIndex !== -1) {
				const updatedAnswers = [...prevAnswers]
				updatedAnswers[existingAnswerIndex] = { id: questionId, answer: selectedAnswer }
				console.log(updatedAnswers)
				return updatedAnswers
			} else {
				const newAnswer = { id: questionId, answer: selectedAnswer }

				return [...prevAnswers, newAnswer]
			}
		})
	}

	const isChecked = (questionId, choice) => {
		const selectedAnswer = selectedAnswers.find((answer) => answer.id === questionId)
		if (!selectedAnswer) {
			return false
		}
		if (Array.isArray(selectedAnswer.answer)) {
			return selectedAnswer.answer.includes(choice.charAt(0))
		}
		return selectedAnswer.answer === choice.charAt(0)
	}

	const handleCheckboxChange = (questionId, choice) => {
		setSelectedAnswers((prevAnswers) => {
			const existingAnswerIndex = prevAnswers.findIndex((answerObj) => answerObj.id === questionId)
			const selectedAnswer = Array.isArray(choice)
				? choice.map((c) => c.charAt(0))
				: choice.charAt(0)

			if (existingAnswerIndex !== -1) {
				const updatedAnswers = [...prevAnswers]
				const existingAnswer = updatedAnswers[existingAnswerIndex].answer
				let newAnswer
				if (Array.isArray(existingAnswer)) {
					newAnswer = existingAnswer.includes(selectedAnswer)
						? existingAnswer.filter((a) => a !== selectedAnswer)
						: [...existingAnswer, selectedAnswer]
				} else {
					newAnswer = [existingAnswer, selectedAnswer]
				}
				updatedAnswers[existingAnswerIndex] = { id: questionId, answer: newAnswer }
				console.log(updatedAnswers)
				return updatedAnswers
			} else {
				const newAnswer = { id: questionId, answer: [selectedAnswer] }
				return [...prevAnswers, newAnswer]
			}
		})
	}


const handleSubmit = () => {
  let scores = 0;
  quizQuestions.forEach((question) => {
    const selectedAnswer = selectedAnswers.find((answer) => answer.id === question.id);
    if (selectedAnswer) {
      const selectedOptions = Array.isArray(selectedAnswer.answer)
        ? selectedAnswer.answer.map((option) => option.charAt(0))
        : [selectedAnswer.answer.charAt(0)];
      const correctOptions = Array.isArray(question.correctAnswers)
        ? question.correctAnswers.map((option) => option.charAt(0))
        : [question.correctAnswers.charAt(0)];
      const isCorrect = selectedOptions.length === correctOptions.length && selectedOptions.every((option) => correctOptions.includes(option));
      if (isCorrect) {
        scores++;
      }
    }
  });
  setTotalScores(scores);
  setSelectedAnswers([]);
  setCurrentQuestionIndex(0);
  navigate("/quiz-result", { state: { quizQuestions, totalScores: scores } });
};


	const handleNextQuestion = () => {
		if (currentQuestionIndex < quizQuestions.length - 1) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
			console.log(selectedAnswers)
		} else {
			handleSubmit()
		}
	}

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
		}
	}

	return (
		<div className="p-10">
			<h3 className="text-3xl font-semibold text-blue-500 mb-4">
				Question {quizQuestions.length > 0 ? currentQuestionIndex + 1 : 0} of {quizQuestions.length}
			</h3>

			<h4 className="mb-4 text-xl font-medium">
				<pre>{quizQuestions[currentQuestionIndex]?.question}</pre>
			</h4>

			<AnswerOptions
				question={quizQuestions[currentQuestionIndex]}
				isChecked={isChecked}
				handleAnswerChange={handleAnswerChange}
				handleCheckboxChange={handleCheckboxChange}
			/>

			<div className="mt-4">
				<button
					className="bg-blue-500 p-2 m-2 rounded text-white cursor-pointer hover:bg-blue-600"
					onClick={handlePreviousQuestion}
					disabled={currentQuestionIndex === 0}>
					Previous question
				</button>
				<button
					className={`bg-yellow-500 p-2 m-2 rounded text-white cursor-pointer hover:bg-yellow-600 ${
						currentQuestionIndex === quizQuestions.length - 1 && "bg-red-500 p-2 m-2 rounded text-white cursor-pointer hover:bg-red-600"
					}`}
					onClick={handleNextQuestion}
					disabled={
						!selectedAnswers.find(
							(answer) =>
								answer.id === quizQuestions[currentQuestionIndex]?.id || answer.answer.length > 0
						)
					}>
					{currentQuestionIndex === quizQuestions.length - 1 ? "Submit quiz" : "Next question"}
				</button>
			</div>
		</div>
	)
}

export default Quiz
