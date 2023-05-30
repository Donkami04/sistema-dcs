const express = require("express");
const router = express.Router();
const {getSwitches} = require('../controllers/switches')

router.get('/', async (req, res, next) => {
    try {
        const switches = await getSwitches();
        res.json(switches);
    } catch (error) {
        next(error);
    };
});

module.exports = router;