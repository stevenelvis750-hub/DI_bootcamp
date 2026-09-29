const express = require("express");
const quizController = require("../controllers/quizController");

const router = express.Router();

router.post("/start", quizController.start);
router.post("/answer", quizController.answer);
router.post("/next", quizController.next);

module.exports = router;