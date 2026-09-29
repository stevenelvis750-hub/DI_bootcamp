const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.get("/", bookController.getAll);
router.get("/:bookId", bookController.getById);
router.post("/", bookController.create);
router.put("/:bookId", bookController.update);
router.delete("/:bookId", bookController.remove);

module.exports = router;