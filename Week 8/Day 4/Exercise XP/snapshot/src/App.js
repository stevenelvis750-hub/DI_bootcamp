import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import "./styles.css";

const App = () => (
  <Router>
    <Navbar />
    <Search />
    <Routes>
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  </Router>
);

export default App;
