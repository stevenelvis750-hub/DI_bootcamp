import React from "react";
import "./Clock.css";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

const range = (n, start = 0) => Array.from({ length: n }, (_, i) => i + start);
const pad = (n) => String(n).padStart(2, "0");

/* One ring of labels. It rotates so the current item sits on the
   3 o'clock line. `turns` counts completed laps so the ring never
   spins backwards when a value wraps (59 -> 0). */
class Ring extends React.Component {
  state = { prev: this.props.index, turns: 0 };

  static getDerivedStateFromProps(props, state) {
    if (props.index === state.prev) return null;
    return {
      prev: props.index,
      turns: props.index < state.prev ? state.turns + 1 : state.turns,
    };
  }

  render() {
    const { labels, index, radius } = this.props;
    const step = 360 / labels.length;
    const rotation = -(index + this.state.turns * labels.length) * step;

    return (
      <div className="ring" style={{ transform: `rotate(${rotation}deg)` }}>
        {labels.map((label, i) => (
          <span
            key={i}
            className={"item" + (i === index ? " active" : "")}
            style={{ transform: `rotate(${i * step}deg) translateX(${radius}px)` }}
          >
            {label}
          </span>
        ))}
      </div>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getTime();
  }

  getTime() {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth(),
      dayOfWeek: now.getDay(),
      dayOfMonth: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.setState(this.getTime()), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { year, month, dayOfWeek, dayOfMonth, hour, minute, second } = this.state;

    return (
      <div className="clock">
        <div className="corner top-left">{year}</div>
        <div className="corner bottom-right">{MONTHS[month]}</div>

        <div className="pointer" />

        <Ring labels={DAYS} index={dayOfWeek} radius={34} />
        <Ring labels={range(31, 1)} index={dayOfMonth - 1} radius={112} />
        <Ring labels={range(24).map(pad)} index={hour} radius={172} />
        <Ring labels={range(60).map(pad)} index={minute} radius={232} />
        <Ring labels={range(60).map(pad)} index={second} radius={292} />

        <div className="dot" />
      </div>
    );
  }
}

export default Clock;