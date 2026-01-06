const theatreRouter = require("express").Router();
const {
  addTheatre,
  updateTheatre,
  deleteTheatre,
  getAllTheatres,
  getTheatresByOwner,
} = require("../controllers/theatreController");

// Add theatre
theatreRouter.post("/add-theatre", addTheatre);

// Update theatre
theatreRouter.put("/update-theatre", updateTheatre);

// Delete theatre
theatreRouter.delete("/delete-theatre", deleteTheatre);

// Get all theatres
theatreRouter.get("/get-all-theatres", getAllTheatres);

//get the theatre of a particular owner
theatreRouter.get("/get-all-theatres-by-owner/:ownerId", getTheatresByOwner);

module.exports = theatreRouter;
