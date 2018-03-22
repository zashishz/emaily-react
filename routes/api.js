const router = require('express').Router();

router.get('/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;