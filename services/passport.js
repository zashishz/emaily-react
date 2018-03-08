
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if(user) done(null, user)
});

const User = mongoose.model('users');

const keys = require('../config/keys')

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const userExists = await User.findOne({ googleId: profile.id})
    if(userExists) {
        //user already exists
        done(null, userExists);
    } else {
        // create a new user
        const user = await new User({ googleId: profile.id }).save()
        done(null, user);
    }
}))