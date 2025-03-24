import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Navbar from "./Navbar"; 
import Home from "./Home";
import Signin from "./Signin";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Editor from "./Editor";
import './style.css';

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
