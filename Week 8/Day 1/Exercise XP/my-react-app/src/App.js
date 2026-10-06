import React from "react";
import Clock from "./components/clock";
import Form from "./components/form";
import "./App.css";

function App() {
  return (
    <main className="exercise-app">
      <Clock />
      <section className="signup-section" aria-label="Sign up exercise">
        <Form />
      </section>
    </main>
  );
}

export default App;