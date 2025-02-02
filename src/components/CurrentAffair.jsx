import React, { useState, useEffect } from "react";
import "./CurrentAffair.css";

const CurrentAffair = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    if (!month || !year) return;

    try {
      const response = await fetch(
        `https://gk-gs-api.vercel.app/get_questions/curr_aff_questions/${month}${year}?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      setError("Failed to fetch questions. Please try again later.");
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [month, year]);

  const handleAnswerClick = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].showAnswer = true; // Show answer for the clicked question
    setQuestions(updatedQuestions);
  };

  const handleOptionClick = (questionIndex, selectedOption) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].selectedOption = selectedOption;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="current-affair">
      <div className="dropdowns">
        <select onChange={(e) => setMonth(e.target.value)} value={month}>
          <option value="">Select Month</option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((m) => (
            <option key={m} value={m.toLowerCase()}>
              {m}
            </option>
          ))}
        </select>

        <select onChange={(e) => setYear(e.target.value)} value={year}>
          <option value="">Select Year</option>
          {[2019, 2020, 2021, 2022, 2023, 2024].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="questions">
        {questions.map((questionObj, index) => (
          <div key={index} className="question-card">
            <p>{questionObj.question}</p>
            <div className="options">
              {questionObj.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(index, option)}
                  className={
                    questionObj.selectedOption === option
                      ? questionObj.answer.includes(option)
                        ? "correct"
                        : "incorrect"
                      : ""
                  }
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              className="answer-btn"
              onClick={() => handleAnswerClick(index)}
            >
              Answer
            </button>

            {questionObj.showAnswer && (
              <div className="answer">
                {questionObj.answer
                  ? `Correct Answer: ${questionObj.answer}`
                  : "No answer available"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentAffair;
