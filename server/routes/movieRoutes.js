const movieRouter = require("express").Router();

const {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovieById,
} = require("../controllers/movieController");

movieRouter.post("/add-movie", addMovie);
movieRouter.get("/get-all-movies", getAllMovies);
movieRouter.put("/update-movie", updateMovie);
movieRouter.delete("/delete-movie", deleteMovie);
movieRouter.get("/movie/:id", getMovieById);

module.exports = movieRouter;
