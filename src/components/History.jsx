/*import React, { useState } from "react";
import "./History.css";

const History = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showAnswer, setShowAnswer] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({}); // Stores selected options

  const topics = ["Ancient History", "Modern History", "Medieval History"];

  const fetchQuestions = async (topic) => {
    const formattedTopic = topic.toLowerCase().replace(/ /g, "_");
    const apiUrl = `https://gk-gs-api.vercel.app/get_topic_wise_questions/topic_wise_questions/${formattedTopic}?api_key=21112263532452dsfr2241321fq4141`;

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
    <div className="history">
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
                  const optionWithLetter = `${String.fromCharCode(
                    65 + idx
                  )}. ${option}`;
                  const isSelected =
                    selectedOptions[index] === optionWithLetter;
                  const isCorrect = correctAnswer.startsWith(
                    optionWithLetter.charAt(0)
                  ); // Compare first letter of option to correct answer

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
                      onClick={() => handleOptionClick(index, optionWithLetter)}
                    >
                      {optionWithLetter}
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

export default History;
*/ /*
import React, { useState } from "react";
import "./History.css";

const History = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});

  const topics = ["Ancient History", "Modern History", "Medieval History"];

  const fetchQuestions = async (topic) => {
    const formattedTopic = topic.toLowerCase().replace(/ /g, "_");
    const apiUrl = `https://gk-gs-api.vercel.app/get_topic_wise_questions/topic_wise_questions/${formattedTopic}?api_key=21112263532452dsfr2241321fq4141`;

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

  const handleOptionClick = (questionIndex, selectedOptionLetter) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionIndex]: selectedOptionLetter,
    }));
  };

  return (
    <div className="history">
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
          const correctAnswerMatch = question.answer.match(
            /^Correct Answer: (\w)/
          );
          const correctAnswerLetter = correctAnswerMatch
            ? correctAnswerMatch[1]
            : "";

          return (
            <div key={index} className="question-card">
              <p className="question">{question.question}</p>
              <div className="options">
                {question.options.map((option, idx) => {
                  const optionLetter = String.fromCharCode(65 + idx);
                  const optionWithLetter = `${optionLetter}. ${option}`;
                  const isSelected = selectedOptions[index] === optionLetter;
                  const isCorrect = optionLetter === correctAnswerLetter;

                  return (
                    <button
                      key={idx}
                      className={`option-button ${
                        isSelected ? (isCorrect ? "correct" : "incorrect") : ""
                      }`}
                      onClick={() => handleOptionClick(index, optionLetter)}
                    >
                      {optionWithLetter}
                    </button>
                  );
                })}
              </div>
              <p className="answer">
                <strong>Correct Answer:</strong> {question.answer}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;*/

import React, { useState } from "react";
import "./History.css";

const History = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showAnswer, setShowAnswer] = useState({});

  const topics = ["Ancient History", "Modern History", "Medieval History"];

  const fetchQuestions = async (topic) => {
    const formattedTopic = topic.toLowerCase().replace(/ /g, "_");
    const apiUrl = `https://gk-gs-api.vercel.app/get_topic_wise_questions/topic_wise_questions/${formattedTopic}?api_key=${
      import.meta.env.VITE_API_KEY
    }`;

    try {
      setError("");
      setQuestions([]);
      setSelectedTopic(topic);
      setShowAnswer({});
      setSelectedOptions({});

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

  const handleOptionClick = (questionIndex, selectedOptionLetter) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: selectedOptionLetter,
    }));
  };

  const toggleAnswer = (questionIndex) => {
    setShowAnswer((prev) => ({
      ...prev,
      [questionIndex]: !prev[questionIndex],
    }));
  };

  return (
    <div className="history">
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
          const correctAnswerMatch = question.answer.match(
            /^Correct Answer: (\w)/
          );
          const correctAnswerLetter = correctAnswerMatch
            ? correctAnswerMatch[1]
            : "";

          return (
            <div key={index} className="question-card">
              <p className="question">{question.question}</p>
              <div className="options">
                {question.options.map((option, idx) => {
                  const optionLetter = String.fromCharCode(65 + idx);
                  const optionWithLetter = `${optionLetter}. ${option}`;
                  const isSelected = selectedOptions[index] === optionLetter;
                  const isCorrect = optionLetter === correctAnswerLetter;

                  return (
                    <button
                      key={idx}
                      className={`option-button ${
                        isSelected ? (isCorrect ? "correct" : "incorrect") : ""
                      }`}
                      onClick={() => handleOptionClick(index, optionLetter)}
                    >
                      {optionWithLetter}
                    </button>
                  );
                })}
              </div>
              <button
                className="answer-button"
                onClick={() => toggleAnswer(index)}
              >
                Show Answer
              </button>
              {showAnswer[index] && (
                <p className="answer">
                  <strong>Correct Answer:</strong> {question.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
