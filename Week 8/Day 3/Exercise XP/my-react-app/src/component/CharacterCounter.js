// CharacterCounter.js
import React, { useRef, useState } from "react";

const CharacterCounter = () => {
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);

  const handleInput = () => {
    setCount(inputRef.current.value.length);
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        ref={inputRef}
        onInput={handleInput}
        placeholder="Type something..."
        style={{ padding: "10px", width: "300px" }}
      />
      <p>Character count: {count}</p>
    </div>
  );
};

export default CharacterCounter;
