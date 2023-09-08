const express = require("express");
const router = express.Router();
const { validateData } = require("../middlewares/validator.handler");
const { createMeshSchema, editMeshSchema } = require("../schemas/mesh.schema");
const { getMesh, createMesh, editOneMesh, deleteMesh } = require("../controllers/mesh");

router.get("/", async (req, res, next) => {
  try {
    const allMesh = await getMesh();
    res.json(allMesh);
  } catch (error) {
    next(error);
  }
});

router.post("/new", validateData(createMeshSchema), async (req, res, next) => {
  try {
    const data = req.body;
    const newMesh = await createMesh(data);
    res.status(newMesh.status).json({
      status: newMesh.status,
      message: newMesh.message,
      error: newMesh.error,
      data: newMesh.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put("/edit/:id", validateData(editMeshSchema), async (req, res, next) => {
  try {
    const id = req.params.id;
    const changes = req.body;
    const meshEdit = await editOneMesh(id, changes);
    res.status(meshEdit.status).json({
      status: meshEdit.status,
      message: meshEdit.message,
      error: meshEdit.error,
      data: meshEdit.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/remove/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const meshDeleted = await deleteMesh(id);
    res.status(meshDeleted.status).json({
      status: meshDeleted.status,
      message: meshDeleted.message,
      error: meshDeleted.error,
      data: meshDeleted.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
