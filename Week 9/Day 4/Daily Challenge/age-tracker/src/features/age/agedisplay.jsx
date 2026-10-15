import { useSelector } from "react-redux";
import "./age.css";

export default function AgeDisplay() {
  const { age, loading } = useSelector((state) => state.age);

  return (
    <div className="age-display">
      <h2>Your Age</h2>
      <div className="age-value">
        {loading ? <div className="spinner" aria-label="Loading" /> : age}
      </div>
      {loading && <p className="status">Updating...</p>}
    </div>
  );
}