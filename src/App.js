import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Location from "./components/Location";
import "./App.css";
import { useDocumentTitle } from "./hooks/useDocumentTitle";

// Create a wrapper component that uses the hook
function AppContent() {
  useDocumentTitle();
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {/* Example location links */}
          <li>
            <Link to="/location/asia">Asia</Link>
          </li>
          <li>
            <Link to="/location/asia/india">Asia/India</Link>
          </li>
          <li>
            <Link to="/location/asia/india/mumbai">Asia/India/Mumbai</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/location/:region?/:province?/:city?"
          element={<Location />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
