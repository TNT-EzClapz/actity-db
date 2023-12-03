const express = require('express');
const router = express.Router();
const apiController = require('./apiController');

// webcrawlers
// api logic


router.use((req, res, next) => {
    res.status(404).send("Could not find anything for \"" + req.path + "\"");
});

module.exports = router;