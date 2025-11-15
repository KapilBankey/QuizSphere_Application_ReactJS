import React from "react";
import "./About.css";

const About = () => {
  const topics = [
    {
      icon: "📊",
      title: "Aptitude",
      description: "Sharpen your problem-solving skills with mathematical and logical reasoning questions.",
    },
    {
      icon: "🧩",
      title: "Reasoning",
      description: "Improve your analytical thinking with puzzles and critical reasoning exercises.",
    },
    {
      icon: "🌍",
      title: "General Knowledge",
      description: "Stay updated with current affairs, science, and history.",
    },
    {
      icon: "📜",
      title: "History",
      description: "Dive deep into Indian and world history with objective-type questions.",
    },
    {
      icon: "📚",
      title: "Multiple Topics",
      description: "And many more topics tailored to exam preparation!",
    },
  ];

  const features = [
    {
      icon: "✨",
      title: "User-Friendly Interface",
      description: "Intuitive and easy-to-navigate design for seamless learning experience.",
    },
    {
      icon: "📝",
      title: "Topic-wise Practice",
      description: "Practice quizzes organized by topics for focused learning.",
    },
    {
      icon: "✅",
      title: "Instant Feedback",
      description: "Get immediate answers and solutions to improve your understanding.",
    },
    {
      icon: "📈",
      title: "Track Progress",
      description: "Monitor your performance and identify areas for improvement.",
    },
    {
      icon: "🎯",
      title: "Exam-Focused",
      description: "Content specifically curated for Banking, SSC, UPSC, and State Exams.",
    },
    {
      icon: "🚀",
      title: "Always Updated",
      description: "Regular updates with latest questions and current affairs.",
    },
  ];

  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About QuizSphere</h1>
        <p className="hero-description">
          QuizSphere is a comprehensive platform designed for students and aspirants 
          preparing for competitive exams. We make learning interactive, engaging, 
          and effective through our curated quiz system.
        </p>
      </div>

      <div className="about-mission">
        <h2>Our Mission</h2>
        <p>
          Our goal is to make learning interactive and fun through engaging quizzes. 
          Prepare for exams like Banking, SSC, UPSC, State Exams, and more with our 
          carefully curated question sets that help you excel in your competitive journey.
        </p>
      </div>

      <div className="topics-section">
        <h2>Explore Our Topics</h2>
        <div className="topics-grid">
          {topics.map((topic, index) => (
            <div key={index} className="topic-card">
              <div className="topic-icon">{topic.icon}</div>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="about-cta">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join thousands of aspirants preparing for their dream careers!</p>
      </div>
    </div>
  );
};

export default About;
