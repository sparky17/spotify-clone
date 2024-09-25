const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./model/User'); 
const Song=require('./model/Song')
const app = express();
const port = 3000;
const authRoutes=require('./Routes/auth')
const songRoutes=require('./Routes/Song')
// Middleware to parse JSON
app.use(express.json());

// JWT strategy options
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'RandomSecret'; // Consider using a more secure secret from environment variables

// Passport JWT strategy
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload.sub }, (err, user) => { // Use _id to find user
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

// Initialize Passport
app.use(passport.initialize());

// Connect to the database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Protected route example
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(`Hello, ${req.user.firstName}!`);
});


app.use("/auth",authRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
