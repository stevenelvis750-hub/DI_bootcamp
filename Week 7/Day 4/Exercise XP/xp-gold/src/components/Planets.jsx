// Exercise 2: display the planets in a Bootstrap list-group
const planets = ['Mars', 'Venus', 'Jupiter', 'Earth', 'Saturn', 'Neptune'];

export default function Planets() {
  return (
    <ul className="list-group">
      {planets.map((planet) => (
        <li key={planet} className="list-group-item">
          {planet}
        </li>
      ))}
    </ul>
  );
}