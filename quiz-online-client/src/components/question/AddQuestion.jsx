import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createQuestion, getSubjects } from "../../../utils/QuizService";

const AddQuestion = () => {
    const [question, setQuestionText] = useState("");
    const [questionType, setQuestionType] = useState("single");
    const [choices, setChoices] = useState(["A."]);
    const [correctAnswers, setCorrectAnswers] = useState([""]);
    const [subject, setSubject] = useState("");
    const [newSubject, setNewSubject] = useState("");
    const [subjectOptions, setSubjectOptions] = useState([""]);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const subjectsData = await getSubjects();
            setSubjectOptions(subjectsData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddChoice = () => {
        const lastChoice = choices[choices.length - 1];
        const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A";
        const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1);
        const newChoice = `${newChoiceLetter}.`;
        setChoices([...choices, newChoice]);
    };

    const handleRemoveChoice = (index) => {
        setChoices(choices.filter((choice, i) => i !== index));
    };

    const handleChoiceChange = (index, value) => {
        setChoices(choices.map((choice, i) => (i === index ? value : choice)));
    };

    const handleCorrectAnswerChange = (index, value) => {
        setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)));
    };

    const handleAddCorrectAnswer = () => {
        setCorrectAnswers([...correctAnswers, ""]);
    };

    const handleRemoveCorrectAnswer = (index) => {
        setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = {
                question,
                questionType,
                choices,
                correctAnswers: correctAnswers.map((answer) => {
                    const choiceLetter = answer.charAt(0).toUpperCase();
                    const choiceIndex = choiceLetter.charCodeAt(0) - 65;
                    return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter : null;
                }),
                subject
            };

            await createQuestion(result);

            setQuestionText("");
            setQuestionType("single");
            setChoices([""]);
            setCorrectAnswers([""]);
            setSubject("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddSubject = () => {
        if (newSubject.trim() !== "") {
            setSubject(newSubject.trim());
            setSubjectOptions([...subjectOptions, newSubject.trim()]);
            setNewSubject("");
        }
    };

    return (
        <div className="bg-blue-300 flex justify-center items-center min-h-screen">
            <div className="bg-white rounded px-8 py-6 border-2 max-w-md w-full">
                <h5 className="text-md mb-8 bg-slate-300 p-2 rounded font-semibold text-center">Add New Questions</h5>
				
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="subject" className="block text-blue-700 mb-2">Select a Subject</label>
                        <select
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
                        >
                            <option value="">Select subject</option>
                            <option value={"New"}>Add New</option>
                            {subjectOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {subject === "New" && (
                <div>
                    <label for="new-subject" className="block text-blue-700">Add New Subject</label>
                    <input
                        type="text"
                        id="new-subject"
                        value={newSubject}
                        onChange={(event) => setNewSubject(event.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
                    />
                    <button
                        type="button"
                        onClick={handleAddSubject}
                        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Subject
                    </button>
                </div>
            )}
                    <div>
                        <label htmlFor="question-text" className="block text-blue-700 mb-2">Question</label>
                        <textarea
                            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
                            rows={4}
                            value={question}
                            onChange={(e) => setQuestionText(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="question-type" className="block text-blue-700 mb-2">Question type</label>
                        <select
                            id="question-type"
                            value={questionType}
                            onChange={(event) => setQuestionType(event.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
                        >
                            <option value="single">Single Answer</option>
                            <option value="multiple">Multiple Answer</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="choices" className="block text-blue-700 mb-2">Choices</label>
                        {choices.map((choice, index) => (
                            <div key={index} className="flex items-center">
                                <input
                                    type="text"
                                    value={choice}
                                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveChoice(index)}
                                    className="ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddChoice}
                            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Choice
                        </button>
                    </div>
                    {questionType === "single" && (
                        <div>
                            <label htmlFor="answer" className="block text-green-700 mb-2">Correct Answer</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
                                id="answer"
                                value={correctAnswers[0]}
                                onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
                            />
                        </div>
                    )}
                    {questionType === "multiple" && (
                        <div>
                            <label htmlFor="answer" className="block text-gray-700">Correct Answer(s)</label>
                            {correctAnswers.map((answer, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
                                        value={answer}
                                        onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                                    />
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            className="ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            onClick={() => handleRemoveCorrectAnswer(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={handleAddCorrectAnswer}
                            >
                                Add Correct Answer
                            </button>
                        </div>
                    )}

                    {!correctAnswers.length && <p>Please enter at least one correct answer.</p>}

                    <div className="flex justify-between">
                <button type="submit" className="inline-flex items-center px-4 py-2 mr-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Save Question
                </button>
                <Link to="/all-quizzes" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Back to existing questions
                </Link>
            </div>
                </form>
            </div>
        </div>
    );
};

export default AddQuestion;
