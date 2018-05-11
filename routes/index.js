const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/api', require('./billing'));
router.use('/api', require('./survey'));

module.exports = router;