import React, { Component } from "react";
import "./Clock.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getDateParts() {
  const now = new Date();

  return {
    year: now.getFullYear(),
    month: now.getMonth(),
    weekday: now.getDay(),
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
  };
}

function twoDigits(value) {
  return String(value).padStart(2, "0");
}

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = getDateParts();
  }

  componentDidMount() {
    this.timerId = window.setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);
  }

  updateTime = () => {
    this.setState(getDateParts());
  };

  render() {
    const { year, month, weekday, day, hour, minute, second } = this.state;
    const time = `${twoDigits(hour)}:${twoDigits(minute)}:${twoDigits(second)}`;
    const date = `${weekdays[weekday]}, ${months[month]} ${day}, ${year}`;
    const hourAngle = (hour % 12) * 30 + minute * 0.5;
    const minuteAngle = minute * 6 + second * 0.1;
    const secondAngle = second * 6;

    return (
      <section className="clock-section" aria-label="Live compass clock">
        <div className="clock-heading">
          <span className="clock-eyebrow">LOCAL TIME</span>
          <h2>Compass clock</h2>
          <p>A live view of today and the time right now.</p>
        </div>

        <div className="clock-face">
          <div className="clock-ring" aria-hidden="true" />
          <div className="clock-tick tick-north" aria-hidden="true" />
          <div className="clock-tick tick-east" aria-hidden="true" />
          <div className="clock-tick tick-south" aria-hidden="true" />
          <div className="clock-tick tick-west" aria-hidden="true" />

          <div className="compass-point point-north">N</div>
          <div className="compass-point point-east">E</div>
          <div className="compass-point point-south">S</div>
          <div className="compass-point point-west">W</div>

          <div className="compass-date date-year">
            <span>YEAR</span>
            <strong>{year}</strong>
          </div>
          <div className="compass-date date-weekday">
            <span>WEEKDAY</span>
            <strong>{weekdays[weekday]}</strong>
          </div>
          <div className="compass-date date-day">
            <span>DAY</span>
            <strong>{twoDigits(day)}</strong>
          </div>
          <div className="compass-date date-month">
            <span>MONTH</span>
            <strong>{months[month]}</strong>
          </div>

          <div
            className="clock-hand hand-hour"
            style={{ transform: `rotate(${hourAngle}deg)` }}
            aria-hidden="true"
          />
          <div
            className="clock-hand hand-minute"
            style={{ transform: `rotate(${minuteAngle}deg)` }}
            aria-hidden="true"
          />
          <div
            className="clock-hand hand-second"
            style={{ transform: `rotate(${secondAngle}deg)` }}
            aria-hidden="true"
          />
          <div className="clock-center" aria-hidden="true" />

          <div className="clock-readout" aria-live="off">
            <time className="digital-time">{time}</time>
            <time className="digital-date">{date}</time>
          </div>
          <span className="sr-only">
            Current local date and time: {date} at {time}
          </span>
        </div>
      </section>
    );
  }
}

export default Clock;
