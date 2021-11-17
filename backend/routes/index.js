const router = require('express').Router();
const healthcheck = require('./healthcheck.routes');
const { createIdea } = require('./idea.routes');

router.get('/healthcheck', healthcheck);
router.get('/ideas/create', createIdea);

module.exports = router;
