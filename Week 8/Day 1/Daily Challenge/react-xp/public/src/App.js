import React from "react";
import Clock from "./Clock";
import Color from "./Color";
import ErrorBoundary from "./ErrorBoundary";
import FormComponent from "./FormComponent";

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick = () => {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  };

  render() {
    if (this.state.counter === 5) {
      throw new Error("I crashed!");
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

// Simulation 1: both counters share one boundary
const Simulation1 = () => (
  <ErrorBoundary>
    <BuggyCounter />
    <BuggyCounter />
  </ErrorBoundary>
);

// Simulation 2: each counter has its own boundary
const Simulation2 = () => (
  <>
    <ErrorBoundary><BuggyCounter /></ErrorBoundary>
    <ErrorBoundary><BuggyCounter /></ErrorBoundary>
  </>
);

// Simulation 3: no boundary, the whole app unmounts when it crashes
const Simulation3 = () => <BuggyCounter />;

// Stateful container: holds the form data and passes it down as props
class FormContainer extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    destination: "",
    nutsFree: false,
    lactoseFree: false,
    isVegan: false,
  };

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  };

  render() {
    return <FormComponent data={this.state} handleChange={this.handleChange} />;
  }
}

const VIEWS = {
  "Clock": Clock,
  "Error 1": Simulation1,
  "Error 2": Simulation2,
  "Error 3": Simulation3,
  "Lifecycle": Color,
  "Form": FormContainer,
};

class App extends React.Component {
  // after a form submit the URL has a query string, so reopen the Form view
  state = { view: window.location.search ? "Form" : "Clock" };

  render() {
    const View = VIEWS[this.state.view];
    return (
      <div>
        <nav style={{ padding: 10, position: "relative", zIndex: 1 }}>
          {Object.keys(VIEWS).map((name) => (
            <button key={name} onClick={() => this.setState({ view: name })}>
              {name}
            </button>
          ))}
        </nav>
        <View />
      </div>
    );
  }
}

export default App;