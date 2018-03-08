### Establish Connection into app
```
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI)
```

### Create a Model via Mongoose aka Collection in Mongo DB
```
const mongoose = require('mongoose');
const {Schema} = mongoose;

//Schema means structure for records going in Users Model
const userSchema = new Schema({
    googleId: String
})

mongoose.model('users', userSchema);
```

### Use Mongoose to Create a record into model
```
require('../models/User');
const User = mongoose.model('users');

new User({ googleId: profile.id }).save()
```

### check if user exists not then register yes then skip
```
const userExists = await User.findOne({ googleId: profile.id});
if(userExists) {
    //user already exists
    done(null, userExists);
} else {
    // create a new user
    const user = await new User({ googleId: profile.id }).save();
    done(null, user);
}
```

### serialise and deserialise based cookie auth
```
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if(user) done(null, user)
});
```

```
==> npm Install cookie-session to express

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());
```