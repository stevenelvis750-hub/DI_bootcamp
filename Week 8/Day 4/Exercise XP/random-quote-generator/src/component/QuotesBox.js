import React, { useState } from "react";
import quotes from "../data/quotes";

const getRandomColor = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#FFD433"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const QuoteBox = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [bgColor, setBgColor] = useState("#ffffff");

  const handleNewQuote = () => {
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote.text === currentQuote.text);

    setCurrentQuote(newQuote);
    setBgColor(getRandomColor());
  };

  return (
    <div
      style={{
        backgroundColor: bgColor,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.5s ease",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ color: bgColor }}>{currentQuote.text}</h2>
        <p>- {currentQuote.author}</p>
        <button
          onClick={handleNewQuote}
          style={{
            backgroundColor: bgColor,
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteBox;
