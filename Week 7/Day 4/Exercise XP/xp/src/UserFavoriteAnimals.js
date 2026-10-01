import { Component } from 'react';

// Class component: receives the favAnimals array through props
class UserFavoriteAnimals extends Component {
  render() {
    const { favAnimals } = this.props;

    return (
      <ul>
        {favAnimals.map((animal, index) => (
          <li key={index}>{animal}</li>
        ))}
      </ul>
    );
  }
}

export default UserFavoriteAnimals;