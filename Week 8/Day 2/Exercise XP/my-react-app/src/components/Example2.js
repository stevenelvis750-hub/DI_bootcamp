import React, { Component } from "react";
import data from "./data.json";

class Example2 extends Component {
  render() {
    return (
      <div>
        {data.Skills.map((skill, index) => (
          <div key={index}>{skill}</div>
        ))}
      </div>
    );
  }
}

export default Example2;
