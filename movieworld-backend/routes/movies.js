const router = require("express").Router();
const Watchlist = require("../models/Watchlist");

router.post("/add", async (req, res) => {
  const { userId, movie } = req.body;
  let watchlist = await Watchlist.findOne({ userId });
  if (!watchlist) watchlist = new Watchlist({ userId, movies: [] });
  watchlist.movies.push(movie);
  await watchlist.save();
  res.json(watchlist);
});

router.get("/:userId", async (req, res) => {
  const list = await Watchlist.findOne({ userId: req.params.userId });
  res.json(list?.movies || []);
});

module.exports = router;
