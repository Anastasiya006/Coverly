import React from "react";
import Navbar from "./Navbar"; 
import { ThemeProvider } from "next-themes";
import './style.css';
import TitlePage from "./TitlePage";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div>
        <Navbar/>
        <TitlePage/>
      </div>
    </ThemeProvider>
  );
};

export default App;
