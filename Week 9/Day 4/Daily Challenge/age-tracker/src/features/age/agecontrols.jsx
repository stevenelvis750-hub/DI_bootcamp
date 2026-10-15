import { useDispatch, useSelector } from "react-redux";
import { ageUpAsync, ageDownAsync } from "./ageslice";

export default function AgeControls() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.age.loading);

  const handleAgeUp = (e) => {
    e.preventDefault();
    dispatch(ageUpAsync(1));
  };

  const handleAgeDown = (e) => {
    e.preventDefault();
    dispatch(ageDownAsync(1));
  };

  return (
    <form className="age-controls">
      <button onClick={handleAgeUp} disabled={loading}>
        Age Up
      </button>
      <button onClick={handleAgeDown} disabled={loading}>
        Age Down
      </button>
    </form>
  );
}