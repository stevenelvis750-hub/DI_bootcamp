import React, { Component } from "react";
import data from "./data.json";

class Example3 extends Component {
  render() {
    return (
      <div>
        {data.Experiences.map((exp, index) => (
          <div key={index}>
            <strong>{exp.company}</strong> - {exp.role}
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;
