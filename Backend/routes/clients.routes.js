const express = require("express");
const router = express.Router();
const {getClients} = require('../controllers/clients')

router.get('/', async (req, res, next) => {
    try {
        const allClients = await getClients();
        res.json(allClients);
    } catch (error) {
        next(error);
    };
});

module.exports = router;