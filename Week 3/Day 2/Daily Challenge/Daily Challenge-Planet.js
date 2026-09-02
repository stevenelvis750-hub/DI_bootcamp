const planets = [
  { name: "Mercury", moons: 0, distanceFromSun: "57.9 million km" },
  { name: "Earth", moons: 1, distanceFromSun: "149.6 million km" },
  { name: "Mars", moons: 2, distanceFromSun: "227.9 million km" },
  { name: "Jupiter", moons: 95, distanceFromSun: "778.5 million km" }
];

function showPlanetInfo(planet) {
  console.log(`Planet: ${planet.name}`);
  console.log(`Moons: ${planet.moons}`);
  console.log(`Distance from the Sun: ${planet.distanceFromSun}`);
  console.log("--------------------------");
}

planets.forEach(showPlanetInfo);