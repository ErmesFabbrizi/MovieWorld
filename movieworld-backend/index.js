// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
const passport = require("passport");

dotenv.config(); // Load environment variables
require("./config/passport");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(cookieSession({
  name: "session",
  keys: ["moviekey"],
  maxAge: 24 * 60 * 60 * 1000,
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection error:', err));

app.use("/api/movies", require("./routes/movies"));
app.use("/auth", require("./routes/auth"));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  });

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
