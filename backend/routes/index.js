const router = require('express').Router();
const healthcheck = require('./healthcheck.routes');

router.get('/healthcheck', healthcheck);

module.exports = router;
