const express = require("express");
const router = express.Router();
const { getMesh } = require("../controllers/mesh");

router.get("/", async (req, res, next) => {
  try {
    const allMesh = await getMesh();
    res.json(allMesh);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
