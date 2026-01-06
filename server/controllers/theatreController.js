const Theatre = require("../models/theatreModel");

const addTheatre = async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "Theatre added successfully",
      data: newTheatre,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateTheatre = async (req, res) => {
  const theatreId = req.body.theatreId;
  try {
    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
      return res
        .status(404)
        .json({ success: false, message: "Theatre not found" });
    }
    await Theatre.findByIdAndUpdate(theatreId, req.body);
    res.send({ success: true, message: "Theatre updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTheatre = async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.theatreId);
    res.send({ success: true, message: "Theatre deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete theatre" });
  }
};

const getAllTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find();
    res.send({
      success: true,
      message: "All Theatres fetched successfully",
      data: theatres,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch theatres" });
  }
};

const getTheatresByOwner = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const theatres = await Theatre.find({ owner: ownerId });
    res.send({
      success: true,
      message: "Theatres fetched successfully",
      data: theatres,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  addTheatre,
  updateTheatre,
  deleteTheatre,
  getAllTheatres,
  getTheatresByOwner,
};
