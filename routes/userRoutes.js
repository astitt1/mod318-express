const express = require("express");
const router = express.Router();

//Put all user routes here

router.get("/", (req, res) => {
  res.send("Received a GET request for the user!");
});
router.post("/", (req, res) => {
  res.send("Received a POST request for the user");
});

router.get("/:id", (req, res) => {
  res.send(`Navigated to the user page for: ${req.params.id}`);
});
router.get("/:id/profile", (req, res) => {
  res.send(`Navigated to the user profile page for: ${req.params.id}`);
});
router.get("/:id/profile/:data", (req, res) => {
  res.send(
    `Navigated to the user profile page for: ${req.params.id}, with the data: ${req.params.data}`
  );
});

module.exports = router;
