import React from "react";
import Clock from "./components/clock";
import Form from "./components/form";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <Clock />
      <hr />
      <Form />
    </div>
  );
}

export default App;