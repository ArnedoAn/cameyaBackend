import express from "express";

const router = express.Router(); // Route: /services

router.get("/", async (req, res) => {
  res.send("Client route");
});

export default router;
