import React, { useState } from "react";
import "./Reasoning.css";
import AttemptQuestionCard from "./Attempt-question-card";

const Reasoning = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showAnswer, setShowAnswer] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({}); // Stores selected options
  const [showCompletionCard, setShowCompletionCard] = useState(false);
  const [completionStats, setCompletionStats] = useState({
    topicName: "",
    totalQuestions: 0,
    correctCount: 0,
    incorrectCount: 0,
  });

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
      setSelectedOptions({});
      setShowAnswer({});
      setShowCompletionCard(false);

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
    const newSelectedOptions = {
      ...selectedOptions,
      [questionIndex]: selectedOption,
    };
    setSelectedOptions(newSelectedOptions);
    checkCompletion(newSelectedOptions);
  };

  const checkCompletion = (options) => {
    if (questions.length === 0) return;

    const allAnswered = questions.every(
      (_, index) => options[index] !== undefined && options[index] !== null
    );

    if (allAnswered) {
      let correctCount = 0;
      let incorrectCount = 0;

      questions.forEach((question, index) => {
        const correctAnswer = question.answer;
        const selectedOption = options[index];
        if (selectedOption && correctAnswer === selectedOption.charAt(0)) {
          correctCount++;
        } else if (selectedOption) {
          incorrectCount++;
        }
      });

      setCompletionStats({
        topicName: selectedTopic,
        totalQuestions: questions.length,
        correctCount,
        incorrectCount,
      });

      setTimeout(() => {
        setShowCompletionCard(true);
      }, 500);
    }
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
                      disabled={showCompletionCard}
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

      {/* Completion Card */}
      <AttemptQuestionCard
        topicName={completionStats.topicName}
        totalQuestions={completionStats.totalQuestions}
        correctCount={completionStats.correctCount}
        incorrectCount={completionStats.incorrectCount}
        isOpen={showCompletionCard}
        onClose={() => setShowCompletionCard(false)}
      />
    </div>
  );
};

export default Reasoning;
