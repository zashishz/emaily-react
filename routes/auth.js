const router = require('express').Router();
const passport = require('passport');

require('../services/passport')

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}))

router.get('/google/callback', passport.authenticate('google'))

router.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user);
})

module.exports = router;
