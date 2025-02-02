import React from "react";
import "./About.css";
const About = () => {
  return (
    <div className="about-container">
      <h2>About QuizSphere</h2>
      <p>
        QuizSphere is a one-stop platform for students and aspirants preparing
        for competitive exams. We offer quizzes across multiple topics such as:
      </p>
      <ul>
        <li>
          Aptitude: Sharpen your problem-solving skills with mathematical and
          logical reasoning questions.
        </li>
        <li>
          Reasoning: Improve your analytical thinking with puzzles and critical
          reasoning exercises.
        </li>
        <li>
          General Knowledge: Stay updated with current affairs, science, and
          history.
        </li>
        <li>
          History: Dive deep into Indian and world history with objective-type
          questions.
        </li>
        <li>And many more topics tailored to exam preparation!</li>
      </ul>
      <p>
        Our goal is to make learning interactive and fun through engaging
        quizzes. Prepare for exams like Banking, SSC, UPSC, State Exams, and
        more with our curated question sets.
      </p>
      <h3>Key Features:</h3>
      <ul>
        <li>User-friendly interface.</li>
        <li>Topic-wise practice quizzes.</li>
      </ul>
    </div>
  );
};
export default About;
