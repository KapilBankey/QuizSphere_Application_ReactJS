/*import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Aptitude from "./components/Aptitude";
import CurrentAffair from "./components/CurrentAffair";
import RestTopic from "./components/RestTopic";
import About from "./components/About";
import Contact from "./components/Contact";
import Feedback from "./components/Feedback";

import "./App.css";
import logo from "./components/logo.png";

const App = () => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const sentences = [
    "Ready to make some noise?",
    "Are you ready to make some noise and ignite the excitement?",
    "Get set to unleash your energy and turn up the volume.",
    "It's time to break the silence and let your voice be heard.",
    "Join the action and make some unforgettable noise!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <img src={logo} alt="Logo" className="logo" />
          <h1>QuizSphere Hub</h1>
          <p className="sentence">{sentences[sentenceIndex]}</p>
          <div className="navbar">
            <Link to="/aptitude">Aptitude</Link>
            <Link to="/current-affair">Current Affairs</Link>
            <Link to="/rest-topic">Other Topics</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/feedback">Feedback</Link>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/aptitude" element={<Aptitude />} />
            <Route path="/current-affair" element={<CurrentAffair />} />
            <Route path="/rest-topic" element={<RestTopic />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route
              path="*"
              element={
                <h2>
                  Welcome to QuizSphere Hub! Select a topic to get started.
                </h2>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
*/
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Aptitude from "./components/Aptitude";
import CurrentAffair from "./components/CurrentAffair";
import RestTopic from "./components/RestTopic";
import Reasoning from "./components/Reasoning";
import History from "./components/History";
import About from "./components/About";
import Contact from "./components/Contact";
import Feedback from "./components/Feedback";
import RegisterLogin from "./components/RegisterLogin";
import "./App.css";
import logo from "./components/logo.png";

const App = () => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const sentences = [
    "Ready to make some noise?",
    "Are you ready to make some noise and ignite the excitement?",
    "Get set to unleash your energy and turn up the volume.",
    "It's time to break the silence and let your voice be heard.",
    "Join the action and make some unforgettable noise!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <img src={logo} alt="Logo" className="logo" />
          <h1>QuizSphere Hub</h1>
          <p className="sentence">{sentences[sentenceIndex]}</p>

          <RegisterLogin />

          <div className="navbar">
            <Link to="/aptitude">Aptitude</Link>
            <Link to="/current-affair">Current Affairs</Link>
            <Link to="/reasoning">Reasoning</Link>
            <Link to="/history">History</Link>
            <Link to="/rest-topic">Other Topics</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/feedback">Feedback</Link>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/register-login" element={<RegisterLogin />} />
            <Route path="/aptitude" element={<Aptitude />} />
            <Route path="/current-affair" element={<CurrentAffair />} />
            <Route path="reasoning" element={<Reasoning />} />
            <Route path="History" element={<History />} />
            <Route path="/rest-topic" element={<RestTopic />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route
              path="*"
              element={
                <h2>
                  Welcome to QuizSphere Hub! Select a topic to get started.
                </h2>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
