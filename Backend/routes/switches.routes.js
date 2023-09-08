const express = require("express");
const router = express.Router();
const { validateData } = require("../middlewares/validator.handler");
const { createSwitchesSchema, editSwitchesSchema } = require("../schemas/switches.schema");
const {getSwitches, createSwitch, editOneSwitch, deleteSwitch} = require('../controllers/switches')

router.get('/', async (req, res, next) => {
    try {
        const switches = await getSwitches();
        res.json(switches);
    } catch (error) {
        next(error);
    };
});

router.post("/new", validateData(createSwitchesSchema), async (req, res, next) => {
    try {
      const data = req.body;
      const newSwitch = await createSwitch(data);
      res.status(newSwitch.status).json({
        status: newSwitch.status,
        message: newSwitch.message,
        error: newSwitch.error,
        data: newSwitch.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  
  router.put("/edit/:id", validateData(editSwitchesSchema), async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const switchEdit = await editOneSwitch(id, changes);
      res.status(switchEdit.status).json({
        status: switchEdit.status,
        message: switchEdit.message,
        error: switchEdit.error,
        data: switchEdit.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  
  router.delete("/remove/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const switchDeleted = await deleteSwitch(id);
      res.status(switchDeleted.status).json({
        status: switchDeleted.status,
        message: switchDeleted.message,
        error: switchDeleted.error,
        data: switchDeleted.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  

module.exports = router;