import React, { useState } from "react";
import "./Reasoning.css";

const Reasoning = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showAnswer, setShowAnswer] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({}); // Stores selected options

  const topics = [
    "Verification of the Truth statement",
    "Verbal Classification",
    "Syllogism",
    "Statement and Assumption",
    "Numberseries",
    "Matching Definitions",
    "Logical sequence of words",
    "Logical Problems",
    "Letter Series",
    "Essential Part",
    "Data Sufficiency",
    "Course nd Action",
    "Coding Decoding",
    "Analogies",
    "Analyzing Arguments",
    "Assertion and Reason",
    "Blood Relation",
    "Cause and Rffect",
  ];

  const fetchQuestions = async (topic) => {
    const formattedTopic = topic.toLowerCase().replace(/ /g, "_");
    const apiUrl = `https://gk-gs-api.vercel.app/get_topic_wise_questions/reasoning/${formattedTopic}?api_key=${
      import.meta.env.VITE_API_KEY
    }`;

    try {
      setError("");
      setQuestions([]);
      setSelectedTopic(topic);

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setQuestions(data);
      } else {
        setError("No questions found for this topic.");
      }
    } catch (err) {
      setError("Error fetching questions. Please try again.");
    }
  };

  const handleOptionClick = (questionIndex, selectedOption) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionIndex]: selectedOption,
    }));
  };

  const toggleAnswer = (index) => {
    setShowAnswer((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="reasoning">
      <h2>Select a Topic</h2>
      <div className="topics-container">
        {topics.map((topic) => (
          <button
            key={topic}
            className="topic-button"
            onClick={() => fetchQuestions(topic)}
          >
            {topic}
          </button>
        ))}
      </div>

      {selectedTopic && <h3>Questions for: {selectedTopic}</h3>}

      {error && <p className="error">{error}</p>}

      <div className="questions-container">
        {questions.map((question, index) => {
          const correctAnswer = question.answer; // Correct answer letter (e.g., "A", "B", "C", "D")
          return (
            <div key={index} className="question-card">
              <p className="question">{question.question}</p>
              <div className="options">
                {question.options.map((option, idx) => {
                  const isSelected = selectedOptions[index] === option;
                  const isCorrect = correctAnswer === option.charAt(0); // Compare first character of option to correct answer

                  return (
                    <button
                      key={idx}
                      className={`option-button ${
                        isSelected
                          ? isCorrect
                            ? "correct" // Green if correct
                            : "incorrect" // Red if incorrect
                          : ""
                      }`}
                      onClick={() => handleOptionClick(index, option)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <button
                className="answer-button"
                onClick={() => toggleAnswer(index)}
              >
                Answer
              </button>
              {showAnswer[index] && (
                <p className="answer">
                  <strong>Answer:</strong> {question.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reasoning;
