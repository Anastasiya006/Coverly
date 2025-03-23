import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Navbar from "./Navbar"; 
import TitlePage from "./TitlePage";
import LoginPage from "./Login";
import SignupPage from "./Signup";
import './style.css';

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<TitlePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
