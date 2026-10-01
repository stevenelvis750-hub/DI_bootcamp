import UserFavoriteAnimals from './UserFavoriteAnimals';
import Exercise from './Exercise3';

// Exercise 1
const myelement = <h1>I Love JSX!</h1>;
const sum = 5 + 5;

// Exercise 2
const user = {
  firstName: 'Bob',
  lastName: 'Dylan',
  favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey'],
};

function App() {
  return (
    <div>
      {/* Exercise 1: JSX */}
      <h2>Exercise 1: with JSX</h2>
      <p>Hello World!</p>
      {myelement}
      <p>React is {sum} times better with JSX</p>

      {/* Exercise 2: Object */}
      <h2>Exercise 2: Object</h2>
      <h3>{user.firstName}</h3>
      <h3>{user.lastName}</h3>
      <UserFavoriteAnimals favAnimals={user.favAnimals} />

      {/* Exercise 3: HTML tags in React */}
      <h2>Exercise 3: HTML Tags in React</h2>
      <Exercise />
    </div>
  );
}

export default App;