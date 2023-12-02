const express = require('express');
const router = express.Router();
const apiController = require('./controllers/apiController');

// webcrawlers
// api logic
router.post('/api/v1/ping', apiController.ping);

router.use((req, res, next) => {
    res.status(404).send("Could not find anything for \"" + req.path + "\"");
});

module.exports = router;