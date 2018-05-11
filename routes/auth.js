const router = require('express').Router();
const passport = require('passport');

require('../services/passport')

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}))

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/surveys');
})

router.get('/current_user', (req, res) => {
    res.send(req.user);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;
