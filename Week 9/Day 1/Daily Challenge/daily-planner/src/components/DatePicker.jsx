import { connect } from "react-redux";
import { selectDate } from "../redux/actions";
import {
  todayKey,
  shiftDay,
  weekOf,
  dayName,
  dayNumber,
} from "../utils/dates";

function DatePicker({ selectedDate, tasksByDate, selectDate }) {
  const week = weekOf(selectedDate);
  const today = todayKey();

  return (
    <section className="date-picker" aria-label="Choose a day">
      <div className="date-controls">
        <button onClick={() => selectDate(shiftDay(selectedDate, -1))}>
          Previous day
        </button>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => e.target.value && selectDate(e.target.value)}
          aria-label="Pick a date"
        />
        <button onClick={() => selectDate(shiftDay(selectedDate, 1))}>
          Next day
        </button>
        <button className="ghost" onClick={() => selectDate(today)}>
          Today
        </button>
      </div>

      <ul className="week">
        {week.map((day) => {
          const count = (tasksByDate[day] || []).length;
          const classes = [
            "day",
            day === selectedDate ? "selected" : "",
            day === today ? "today" : "",
          ].join(" ");
          return (
            <li key={day}>
              <button className={classes} onClick={() => selectDate(day)}>
                <span className="day-name">{dayName(day)}</span>
                <span className="day-number">{dayNumber(day)}</span>
                <span className="day-count">
                  {count > 0 ? `${count} task${count > 1 ? "s" : ""}` : "\u00A0"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const mapStateToProps = (state) => ({
  selectedDate: state.selectedDate,
  tasksByDate: state.tasksByDate,
});

export default connect(mapStateToProps, { selectDate })(DatePicker);