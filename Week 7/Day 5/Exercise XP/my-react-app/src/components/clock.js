import React, { useState, useEffect } from "react";

function Clock() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const tick = () => {
    setCurrentDate(new Date());
  };

  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    // Cleanup: runs when the component is removed from the DOM
    return () => clearInterval(timerId);
  }, []); // empty array: set the interval once, on mount

  return (
    <div>
      <h2>Local Time</h2>
      <h1>{currentDate.toLocaleTimeString()}</h1>
    </div>
  );
}

export default Clock;