import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../features/planner/plannerSlice";
import { formatDateKey, shiftDateKey, toDateKey } from "../utils/date";

export default function Calendar() {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.planner.selectedDate);

  return (
    <section className="calendar">
      <div className="calendar-nav">
        <button onClick={() => dispatch(setSelectedDate(shiftDateKey(selectedDate, -1)))}>
          Previous day
        </button>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => e.target.value && dispatch(setSelectedDate(e.target.value))}
          aria-label="Select day"
        />
        <button onClick={() => dispatch(setSelectedDate(shiftDateKey(selectedDate, 1)))}>
          Next day
        </button>
        <button className="ghost" onClick={() => dispatch(setSelectedDate(toDateKey()))}>
          Today
        </button>
      </div>
      <h2>{formatDateKey(selectedDate)}</h2>
    </section>
  );
}