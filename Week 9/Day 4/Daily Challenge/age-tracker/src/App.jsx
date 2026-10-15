import AgeDisplay from "./features/age/agedisplay";
import AgeControls from "./features/age/agecontrols";

export default function App() {
  return (
    <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
      <h1>Age Tracker</h1>
      <AgeDisplay />
      <AgeControls />
    </div>
  );
}