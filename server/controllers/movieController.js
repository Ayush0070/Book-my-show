const Movies = require("../models/movieModel");

const addMovie = async (req, res) => {
  try {
    const newMovie = new Movies(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: "Movie added successfully",
      data: newMovie,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to add movie" });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movies.find();
    res.send({
      success: true,
      message: "All Movies fetched successfully",
      data: movies,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch movies" });
  }
};

const updateMovie = async (req, res) => {
  const movieId = req.body.movieId;
  try {
    await Movies.findByIdAndUpdate(movieId, req.body);
    res.send({ success: true, message: "Movie updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to update movie" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await Movies.findByIdAndDelete(req.body.movieId);
    res.send({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete movie" });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id);
    res.send({
      success: true,
      message: "Movie fetched successfully!",
      data: movie,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovieById,
};
