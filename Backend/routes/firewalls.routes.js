const express = require("express");
const router = express.Router();
const { validateData } = require("../middlewares/validator.handler");
const { createFirewallSchema, editFirewallSchema } = require("../schemas/firewalls.schema");
const { getFirewalls, createFirewall, editOneFirewall, deleteFirewall } = require("../controllers/firewalls");

router.get("/", async (req, res, next) => {
  try {
    const allFirewalls = await getFirewalls();
    res.json(allFirewalls);
  } catch (error) {
    next(error);
  }
});

router.post("/new", validateData(createFirewallSchema), async (req, res, next) => {
  try {
    const data = req.body;
    const newFirewall = await createFirewall(data);
    res.status(newFirewall.status).json({
      status: newFirewall.status,
      message: newFirewall.message,
      error: newFirewall.error,
      data: newFirewall.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put("/edit/:id", validateData(editFirewallSchema), async (req, res, next) => {
  try {
    const id = req.params.id;
    const changes = req.body;
    const firewallEdit = await editOneFirewall(id, changes);
    res.status(firewallEdit.status).json({
      status: firewallEdit.status,
      message: firewallEdit.message,
      error: firewallEdit.error,
      data: firewallEdit.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/remove/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const firewallDeleted = await deleteFirewall(id);
    res.status(firewallDeleted.status).json({
      status: firewallDeleted.status,
      message: firewallDeleted.message,
      error: firewallDeleted.error,
      data: firewallDeleted.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
