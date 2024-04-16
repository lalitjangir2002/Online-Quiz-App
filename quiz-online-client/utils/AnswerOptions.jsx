import React from "react"

const AnswerOptions = ({ question, isChecked, handleAnswerChange, handleCheckboxChange }) => {
	if (!question) {
		return (
			<div>
				No questions available, <br /> you may try agian by reducing your requested number of
				questions on this topic
			</div>
		)
	}

	const { id, questionType, choices } = question

	if (questionType === "single") {
		return (
			<div>
				{choices.sort().map((choice, index) => (
					<div key={choice} className="mx-4 mb-4">
						<input
							className="mr-4"
							type="radio"
							id={choice}
							name={question.id}
							value={choice}
							checked={isChecked(question.id, choice)}
							onChange={() => handleAnswerChange(id, choice)}
						/>
						<label htmlFor={choice} className="text-md font-semibold">
							{choice}
						</label>
					</div>
				))}
			</div>
		)
	} else if (questionType === "multiple") {
		return (
			<div>
				{choices.sort().map((choice, index) => (
					<div key={choice} className="mx-4 mb-4">
						<input
							className="mr-4"
							type="checkbox"
							id={choice}
							name={question.id}
							value={choice}
							checked={isChecked(question.id, choice)}
							onChange={() => handleCheckboxChange(id, choice)}
						/>
						<label htmlFor={choice} className="text-md font-semibold">
							{choice}
						</label>
					</div>
				))}
			</div>
		)
	} else {
		return null
	}
}

export default AnswerOptions
