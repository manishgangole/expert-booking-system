const express = require("express");
const router = express.Router();
const expertController = require("../controllers/expertController");

router.get("/", expertController.getExperts);
router.get("/:id", expertController.getExpertById);

module.exports = router;
router.post("/", async (req, res) => {
  const Expert = require("../models/Expert");
  const expert = await Expert.create(req.body);
  res.json(expert);
});