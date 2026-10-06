import React, { Component } from "react";
import data from "./data.json";

class Example1 extends Component {
  render() {
    return (
      <div>
        {data.SocialMedias.map((media, index) => (
          <div key={index}>{media}</div>
        ))}
      </div>
    );
  }
}

export default Example1;
