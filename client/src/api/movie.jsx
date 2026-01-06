import { axiosInstance } from "./index";

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/get-all-movies");
    return response.data;
  } catch (error) {
    console.log("Error fetching movies:", error);
  }
};
export const addMovie = async (movieData) => {
  try {
    const response = await axiosInstance.post(
      "/api/movies/add-movie",
      movieData
    );
    return response.data;
  } catch (error) {
    console.log("Error adding movie:", error);
  }
};

export const updateMovie = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/movies/update-movie",
      payload
    );
    return response.data;
  } catch (error) {
    console.log("Error updating movie:", error);
  }
};

export const deleteMovie = async (payload) => {
  try {
    const movieId = payload?._id || payload?.movieId;
    const response = await axiosInstance.delete("/api/movies/delete-movie", {
      data: { movieId },
    });
    return response.data;
  } catch (error) {
    console.log("Error deleting movie:", error);
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/movies/movie/${id}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};
