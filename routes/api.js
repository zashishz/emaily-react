const keys = require('../config/keys');
const router = require('express').Router();
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

router.get('/current_user', (req, res) => {
    res.send(req.user);
});

router.post('/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
        amount: 5000,
        currency: "usd",
        source: req.body.id, // obtained with Stripe.js
        description: "5$ for 5 credits"
    });
    
    req.user.credits += 5;

    const user = await req.user.save();
    res.send(user);
})

module.exports = router;