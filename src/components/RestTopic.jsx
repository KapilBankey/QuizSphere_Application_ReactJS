import React, { useState } from "react";
import "./RestTopic.css";
import AttemptQuestionCard from "./Attempt-question-card";

const RestTopic = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionStates, setQuestionStates] = useState([]); // To track each question's state
  const [showCompletionCard, setShowCompletionCard] = useState(false);
  const [completionStats, setCompletionStats] = useState({
    topicName: "",
    totalQuestions: 0,
    correctCount: 0,
    incorrectCount: 0,
  });

  const topics = [
    "Government Schemes",
    "Constitution",
    "Science and Technology",
    "Awards Honours Persons",
    "Indian Economy",
    "Sports",
    "History",
    "Today News",
  ];

  const fetchQuestions = async (topic) => {
    const formattedTopic = topic.toLowerCase().replace(/ /g, "_");
    try {
      const response = await fetch(
        `https://gk-gs-api.vercel.app/get_topic_wise_questions/topic_wise_questions/${formattedTopic}?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await response.json();
      setQuestions(data); // Assuming the API response is an array of question objects
      setSelectedTopic(topic);
      setQuestionStates(
        Array(data.length).fill({
          selectedAnswer: null,
          correctAnswer: null,
          answerRevealed: false,
        })
      ); // Initialize question states with answerRevealed
      setShowCompletionCard(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswerSelection = (questionIndex, option, optionLabel) => {
    const correctOption = questions[questionIndex].answer
      .split(" [")[0]
      .replace("Correct Answer: ", "");
    const newQuestionStates = [...questionStates];
    newQuestionStates[questionIndex] = {
      selectedAnswer: optionLabel,
      correctAnswer: correctOption,
      answerRevealed: false, // Ensure the answer is not revealed before clicking the "Answer" button
    };
    setQuestionStates(newQuestionStates);
    checkCompletion(newQuestionStates);
  };

  const checkCompletion = (states) => {
    if (questions.length === 0) return;

    const allAnswered = states.every(
      (state) => state.selectedAnswer !== null && state.selectedAnswer !== undefined
    );

    if (allAnswered) {
      let correctCount = 0;
      let incorrectCount = 0;

      states.forEach((state) => {
        if (state.selectedAnswer === state.correctAnswer) {
          correctCount++;
        } else if (state.selectedAnswer) {
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

  const handleAnswerButtonClick = (questionIndex) => {
    const correctAnswer = questions[questionIndex].answer
      .split(" [")[0]
      .replace("Correct Answer: ", "");
    const newQuestionStates = [...questionStates];
    newQuestionStates[questionIndex] = {
      ...newQuestionStates[questionIndex],
      correctAnswer: correctAnswer,
      answerRevealed: true, // Mark the answer as revealed
    };
    setQuestionStates(newQuestionStates);
  };

  const getAnswerOptionClass = (optionLabel, questionIndex) => {
    const { selectedAnswer, correctAnswer } = questionStates[questionIndex];
    if (selectedAnswer === optionLabel) {
      return optionLabel === correctAnswer ? "correct" : "incorrect";
    }
    return "";
  };

  return (
    <div className="rest-topic">
      <h2>Select a Topic to Explore</h2>
      <div className="topic-list">
        {topics.map((topic, index) => (
          <div key={index} className="topic-card">
            <h3>{topic}</h3>
            <button onClick={() => fetchQuestions(topic)}>
              View Questions
            </button>
          </div>
        ))}
      </div>

      {selectedTopic && (
        <div className="questions-section">
          <h3>Questions on {selectedTopic}</h3>
          {questions.map((question, index) => (
            <div key={index} className="question-card">
              <p>{question.question}</p>
              <div className="options">
                {question.options.map((option, idx) => {
                  const optionLabel = String.fromCharCode(65 + idx); // A, B, C, D
                  return (
                    <button
                      key={idx}
                      onClick={() =>
                        handleAnswerSelection(index, option, optionLabel)
                      }
                      className={`answer-option ${getAnswerOptionClass(
                        optionLabel,
                        index
                      )}`}
                      disabled={showCompletionCard}
                    >
                      {optionLabel}. {option}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => handleAnswerButtonClick(index)}
                className="answer-btn"
              >
                {questionStates[index].answerRevealed
                  ? `Correct Answer: ${questionStates[index].correctAnswer}`
                  : "Answer"}
              </button>
            </div>
          ))}
        </div>
      )}

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

export default RestTopic;
