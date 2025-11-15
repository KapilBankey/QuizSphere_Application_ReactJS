import React, { useState } from "react";
import "./Aptitude.css";
import AttemptQuestionCard from "./Attempt-question-card";

const Aptitude = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showSolution, setShowSolution] = useState({});
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
    "Numbers",
    "Height and Distance",
    "HCF and LCM",
    "Decimal Fraction",
    "Calendar",
    "Boats and Stream",
    "Average",
    "Area",
    "Ages",
    "Volume and Surface Area",
    "Time and Work",
    "Surds and Indices",
    "Stocks and Shares",
    "Speed Time and Distance",
    "Simple Interest",
    "Ratio and Proportion",
    "Races and Games",
    "Profit and Loss",
    "Problems on Trains",
    "Probability",
    "Pipes and Cisterns",
    "Percentage",
  ];

  const fetchQuestions = async (topic) => {
    const formattedTopic = topic.toLowerCase().replace(/ /g, "_");

    const apiUrl = `https://gk-gs-api.vercel.app/get_topic_wise_questions/aptitude/${formattedTopic}?api_key=${
      import.meta.env.VITE_API_KEY
    }`;
    try {
      setError("");
      setQuestions([]);
      setSelectedTopic(topic);
      setSelectedOptions({});
      setShowAnswer({});
      setShowSolution({});
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

  const extractCorrectAnswer = (answerString) => {
    // Extract the correct option letter (e.g., "B") from "The correct option is (B)"
    const match = answerString.match(/\((\w)\)/);
    return match ? match[1] : null;
  };

  const handleOptionClick = (questionIndex, selectedOption) => {
    // Get the correct answer letter from the answer field
    const correctAnswer = extractCorrectAnswer(questions[questionIndex].answer);

    // Update the selected option state for this question
    const newSelectedOptions = {
      ...selectedOptions,
      [questionIndex]: {
        selectedOption,
        isCorrect: selectedOption.charAt(0) === correctAnswer, // Compare the option letter
      },
    };
    setSelectedOptions(newSelectedOptions);

    // Check if all questions are answered
    checkCompletion(newSelectedOptions);
  };

  const checkCompletion = (options) => {
    if (questions.length === 0) return;

    // Check if all questions have been answered
    const allAnswered = questions.every(
      (_, index) => options[index] && options[index].selectedOption
    );

    if (allAnswered) {
      // Calculate statistics
      let correctCount = 0;
      let incorrectCount = 0;

      questions.forEach((_, index) => {
        if (options[index]?.isCorrect) {
          correctCount++;
        } else if (options[index]?.selectedOption) {
          incorrectCount++;
        }
      });

      setCompletionStats({
        topicName: selectedTopic,
        totalQuestions: questions.length,
        correctCount,
        incorrectCount,
      });

      // Show completion card after a small delay
      setTimeout(() => {
        setShowCompletionCard(true);
      }, 500);
    }
  };

  const toggleSolution = (index) => {
    setShowSolution((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleAnswer = (index) => {
    setShowAnswer((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="aptitude">
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
        {questions.map((question, index) => (
          <div key={index} className="question-card">
            <p className="question">{question.question}</p>
            <div className="options">
              {question.options.map((option, idx) => {
                // Check if this option is selected and whether it's correct or incorrect
                const selected =
                  selectedOptions[index]?.selectedOption === option;
                const isCorrect = selectedOptions[index]?.isCorrect;

                return (
                  <button
                    key={idx}
                    className={`option-button ${
                      selected ? (isCorrect ? "correct" : "incorrect") : ""
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
            <button
              className="solution-button"
              onClick={() => toggleSolution(index)}
            >
              Show Solution
            </button>
            {showSolution[index] && (
              <p className="solution">
                <strong>Solution:</strong> {question.solution}
              </p>
            )}
          </div>
        ))}
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

export default Aptitude;
