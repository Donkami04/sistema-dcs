const express = require("express");
const router = express.Router();
const { getUps, createUps, editOneUps, deleteUps } = require("../controllers/ups");

router.get("/", async (req, res, next) => {
  try {
    const upsList = await getUps();
    res.json(upsList);
  } catch (error) {
    next(error);
  }
});

router.post("/new", async (req, res, next) => {
  try {
    const data = req.body;
    const newUps = await createUps(data);
    res.status(newUps.status).json({
      status: newUps.status,
      message: newUps.message,
      error: newUps.error,
      data: newUps.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put("/edit/:ip", async (req, res, next) => {
  try {
    const ip = req.params.ip;
    const changes = req.body;
    const upsEdit = await editOneUps(ip, changes);
    res.status(upsEdit.status).json({
      status: upsEdit.status,
      message: upsEdit.message,
      error: upsEdit.error,
      data: upsEdit.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/remove/:ip", async (req, res, next) => {
  try {
    const ip = req.params.ip;
    const upsDeleted = await deleteUps(ip);
    res.status(upsDeleted.status).json({
      status: upsDeleted.status,
      message: upsDeleted.message,
      error: upsDeleted.error,
      data: upsDeleted.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
