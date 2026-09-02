import Tattoo from "../models/Tattoo.js";

// @desc    Get all tattoos
// @route   GET /api/tattoos
// @access  Public
const getTattoos = async (req, res) => {
  try {
    const tattoos = await Tattoo.find({});
    res.json({
      success: true,
      data: tattoos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create a tattoo
// @route   POST /api/tattoos
// @access  Private/Admin
const createTattoo = async (req, res) => {
  try {
    const tattoo = await Tattoo.create(req.body);
    res.status(201).json({
      success: true,
      message: "Tattoo added to gallery",
      data: tattoo,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a tattoo
// @route   PUT /api/tattoos/:id
// @access  Private/Admin
const updateTattoo = async (req, res) => {
  try {
    const tattoo = await Tattoo.findById(req.params.id);

    if (tattoo) {
      Object.assign(tattoo, req.body);
      const updatedTattoo = await tattoo.save();

      res.json({
        success: true,
        message: "Tattoo updated successfully",
        data: updatedTattoo,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Tattoo not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a tattoo
// @route   DELETE /api/tattoos/:id
// @access  Private/Admin
const deleteTattoo = async (req, res) => {
  try {
    const tattoo = await Tattoo.findById(req.params.id);

    if (tattoo) {
      await tattoo.deleteOne();

      res.json({
        success: true,
        message: "Tattoo removed from gallery",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Tattoo not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getTattoos, createTattoo, updateTattoo, deleteTattoo };
