import React from "react";

class Child extends React.Component {
  componentWillUnmount() {
    alert("The component named Child is about to be unmounted.");
  }

  render() {
    return <h1>Hello World!</h1>;
  }
}

class Color extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red", previousColor: null, show: true };
  }

  componentDidMount() {
    // after mounting, a timer changes the color to yellow
    this.timer = setTimeout(() => this.setState({ favoriteColor: "yellow" }), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  // returning false would block every update (the button would do nothing)
  shouldComponentUpdate() {
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    return prevState.favoriteColor;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("after update");
    if (prevState.favoriteColor !== this.state.favoriteColor) {
      this.setState({ previousColor: snapshot });
    }
  }

  changeColor = () => this.setState({ favoriteColor: "blue" });

  deleteChild = () => this.setState({ show: false });

  render() {
    const { favoriteColor, previousColor, show } = this.state;
    return (
      <div style={{ padding: 20 }}>
        <h1>My Favorite Color is {favoriteColor}</h1>
        {previousColor && <p>Before the update, it was {previousColor}</p>}
        <button onClick={this.changeColor}>Change color</button>

        {show && <Child />}
        <button onClick={this.deleteChild}>Delete</button>
      </div>
    );
  }
}

export default Color;