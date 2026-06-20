import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";

import ScrollToTop from "./components/ScrollToTop";

import { themes } from "./data";

import "./App.css";

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "Mocha";
    const savedAccent = localStorage.getItem("accent") || "#e8789a";

    const vars = themes[savedTheme];
    if (vars) {
      const root = document.documentElement;

      Object.entries(vars).forEach(([key, val]) => {
        root.style.setProperty(key, val);
      });

      root.style.setProperty("--accent-pink", savedAccent);
      root.style.setProperty("--accent-purple", savedAccent + "cc");
    }
  }, []);
  
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;