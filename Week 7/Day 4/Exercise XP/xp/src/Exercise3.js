import { Component } from 'react';
import './Exercise.css'; // Part III

// Part II: this object styles the <h1>
const style_header = {
  color: 'white',
  backgroundColor: 'DodgerBlue',
  padding: '10px',
  fontFamily: 'Arial',
};

class Exercise extends Component {
  handleSubmit = (event) => {
    event.preventDefault(); // stop the page from reloading
  };

  render() {
    return (
      <div>
        {/* Part I used: style={{ color: 'red', backgroundColor: 'lightblue' }}
            Part II replaces it with the style_header object */}
        <h1 style={style_header}>This is a header</h1>

        {/* Part III: the .para class comes from Exercise.css */}
        <p className="para">This is a paragraph with some text inside it.</p>

        <a href="https://react.dev" target="_blank" rel="noreferrer">
          Visit the React website
        </a>

        <form onSubmit={this.handleSubmit}>
          <h2>Enter your name:</h2>
          <input type="text" name="name" placeholder="Your name" />
          <button type="submit">Submit</button>
        </form>

        <img src="/logo.svg" alt="React logo" width="120" />

        <ul>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;