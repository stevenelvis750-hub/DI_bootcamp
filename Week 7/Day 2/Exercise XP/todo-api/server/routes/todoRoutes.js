const express = require("express");
const todoController = require("../controllers/todoController");

const router = express.Router();

router.post("/", todoController.create);
router.get("/", todoController.getAll);
router.get("/:id", todoController.getById);
router.put("/:id", todoController.update);
router.delete("/:id", todoController.remove);

module.exports = router;