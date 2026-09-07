const gameInfo = [
	{
		username: "Elvis",
		team: "red",
		score: 5,
		items: ["ball", "book", "pen"]
	},
	{
		username: "Shallom",
		team: "blue",
		score: 10,
		items: ["tape", "backpack", "pen"]
	},
	{
		username: "Chacha",
		team: "red",
		score: 55,
		items: ["ball", "eraser", "pen"]
	},
	{
		username: "Ian",
		team: "green",
		score: 1,
		items: ["book", "pen"]
	}
];

const usernames = [];
gameInfo.forEach((player) => {
	usernames.push(`${player.username}!`);
});

const winners = [];
gameInfo.forEach((player) => {
	if (player.score > 5) {
		winners.push(player.username);
	}
});

let totalScore = 0;
gameInfo.forEach((player) => {
	totalScore += player.score;
});

console.log("Usernames:", usernames);
console.log("Winners:", winners);
console.log("Total score:", totalScore);
