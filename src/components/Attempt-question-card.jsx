import React, { useEffect } from "react";
import "./Attempt-question-card.css";

const AttemptQuestionCard = ({
  topicName,
  totalQuestions,
  correctCount,
  incorrectCount,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const attemptedCount = correctCount + incorrectCount;
  const accuracyPercentage =
    attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  return (
    <>
      {/* Overlay */}
      <div className="attempt-card-overlay" onClick={onClose}></div>

      {/* Card */}
      <div className="attempt-question-card">
        {/* Close Button */}
        <button className="attempt-card-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {/* Header */}
        <div className="attempt-card-header">
          <div className="attempt-card-icon">🎉</div>
          <h2 className="attempt-card-title">Topic Completed!</h2>
        </div>

        {/* Topic Name */}
        <div className="attempt-card-topic">
          <span className="topic-label">Topic:</span>
          <span className="topic-name">{topicName}</span>
        </div>

        {/* Statistics */}
        <div className="attempt-card-stats">
          <div className="stat-item">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <span className="stat-label">Total Questions</span>
              <span className="stat-value">{totalQuestions}</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <span className="stat-label">Correct Attempts</span>
              <span className="stat-value correct">{correctCount}</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <span className="stat-label">Incorrect Attempts</span>
              <span className="stat-value incorrect">{incorrectCount}</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <span className="stat-label">Total Attempted</span>
              <span className="stat-value attempted">{attemptedCount}</span>
            </div>
          </div>
        </div>

        {/* Accuracy */}
        <div className="attempt-card-accuracy">
          <div className="accuracy-label">Accuracy</div>
          <div className="accuracy-bar">
            <div
              className="accuracy-fill"
              style={{ width: `${accuracyPercentage}%` }}
            ></div>
          </div>
          <div className="accuracy-percentage">{accuracyPercentage}%</div>
        </div>

        {/* Message */}
        <div className="attempt-card-message">
          {accuracyPercentage >= 80 ? (
            <p className="message success">
              🌟 Excellent work! You're doing great!
            </p>
          ) : accuracyPercentage >= 60 ? (
            <p className="message good">👍 Good job! Keep practicing!</p>
          ) : (
            <p className="message average">
              💪 Keep practicing to improve your score!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AttemptQuestionCard;

