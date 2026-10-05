import React from "react";

function Input({ label, name, value, onChange, error, type = "text" }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={name} style={{ display: "block" }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        style={{ padding: "6px", width: "250px" }}
      />
      {error && <p style={{ color: "red", margin: "4px 0 0" }}>{error}</p>}
    </div>
  );
}

export default Input;