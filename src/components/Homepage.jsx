import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();

  const sentences = [
    "Ready to make some noise?",
    "Are you ready to make some noise and ignite the excitement?",
    "Get set to unleash your energy and turn up the volume.",
    "It's time to break the silence and let your voice be heard.",
    "Join the action and make some unforgettable noise!",
  ];

  const topics = [
    "Aptitude",
    "Current Affairs",
    "Constitution",
    "Science And Technology",
    "Sports",
    "Indian Economy",
    "Government Schemes",
    "General Knowledge",
    "Awards Honours Persons",
    "History",
    "Reasoning",
    "Today News",
  ];

  const [currentSentence, setCurrentSentence] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSentence((prev) => (prev + 1) % sentences.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (topic) => {
    if (topic === "Aptitude") navigate("/aptitude");
    else if (topic === "Current Affairs") navigate("/current-affairs");
    else navigate(`/topic/${topic.replace(/\s+/g, "_").toLowerCase()}`);
  };

  return (
    <div className="homepage">
      <div className="header">
        <div className="logo">
          <img src="/logo.png" alt="QuizSphere Logo" />
          <span>QuizSphere</span>
        </div>
        <h1>Test Series</h1>
      </div>
      <div className="sentences">
        <p>{sentences[currentSentence]}</p>
      </div>
      <div className="topics">
        {topics.map((topic) => (
          <button key={topic} onClick={() => handleNavigation(topic)}>
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
