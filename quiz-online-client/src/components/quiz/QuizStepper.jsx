import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../../utils/QuizService";

const QuizStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedNumQuestions, setSelectedNumQuestions] = useState("");
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjectData();
  }, []);

  const fetchSubjectData = async () => {
    try {
      const subjectsData = await getSubjects();
      setSubjects(subjectsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      if (selectedSubject && selectedNumQuestions) {
        navigate("/take-quiz", { state: { selectedNumQuestions, selectedSubject } });
      } else {
        alert("Please select a subject and number of questions.");
      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleNumQuestionsChange = (event) => {
    setSelectedNumQuestions(event.target.value);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-lg text-gray-800 mb-4">Choose a Subject</h3>
            <select
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              value={selectedSubject}
              onChange={handleSubjectChange}
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-lg text-gray-800 mb-4">Number of Questions</h3>
            <input
              type="number"
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              value={selectedNumQuestions}
              onChange={handleNumQuestionsChange}
              placeholder="Enter the number of questions"
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Confirmation</h2>
            <p className="text-lg text-gray-800 mb-1">Subject: {selectedSubject}</p>
            <p className="text-lg text-gray-800">Number of Questions: {selectedNumQuestions}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    const progress = currentStep === 3 ? 100 : ((currentStep - 1) / 2) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-md overflow-hidden mb-6">
        <div
          className="bg-blue-500 text-xs leading-none py-1 text-center text-black flex"
          style={{ width: `${progress}%` }}
        >
          Step {currentStep}
        </div>
      </div>
    );
  };

  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">Welcome to Quiz Online</h2>
      {renderProgressBar()}
      <div className="bg-white rounded-md shadow-md p-6">
        <div className="mb-6">{renderStepContent()}</div>
        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {currentStep < 3 && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !selectedSubject) ||
                (currentStep === 2 && !selectedNumQuestions)
              }
            >
              Next
            </button>
          )}
          {currentStep === 3 && (
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleNext}
            >
              Start Quiz
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizStepper;
