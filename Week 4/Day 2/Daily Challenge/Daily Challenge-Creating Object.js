class Video {
	constructor(title, uploader, time) {
		this.title = title;
		this.uploader = uploader;
		this.time = time;
	}

	watch() {
		console.log(`${this.uploader} watched all ${this.time} of ${this.title}!`);
	}
}

const firstVideo = new Video("JavaScript Basics", "Elvis", 120);
firstVideo.watch();

const secondVideo = new Video("Cooking Pasta", "Ian", 300);
secondVideo.watch();

const videoData = [
	{ title: "HTML Tutorial", uploader: "Rosemary", time: 180 },
	{ title: "CSS Flexbox", uploader: "Lizz", time: 240 },
	{ title: "Node.js Introduction", uploader: "Shallom", time: 360 },
	{ title: "Python for Beginners", uploader: "Steven", time: 420 },
	{ title: "Git and GitHub", uploader: "Telvin", time: 270 },
];

const videos = [];

for (const { title, uploader, time } of videoData) {
	const video = new Video(title, uploader, time);
	videos.push(video);
	video.watch();
}
