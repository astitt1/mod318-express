const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Creating routes with Express is simple");
});

router.get("/design/:lessonId/:slideId/view", (req, res) => {
  res.send(
    `This is lesson ${req.params.lessonId} and slide number ${req.params.slideId}`
  );
});

module.exports = router;
