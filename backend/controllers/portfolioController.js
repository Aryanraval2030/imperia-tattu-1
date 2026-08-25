import Portfolio from "../models/portfolioModel.js";

// ===============================
// Create Portfolio Item
// ===============================
export const createPortfolio = async (req, res) => {
  try {
    const { title, category, image } = req.body;

    const portfolio = await Portfolio.create({
      title,
      category,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Portfolio item created successfully",
      data: portfolio,
    });
  } catch (error) {
    console.error("Create Portfolio Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create portfolio item",
    });
  }
};

// ===============================
// Get All Portfolio Items
// ===============================
export const getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: portfolios,
    });
  } catch (error) {
    console.error("Get Portfolio Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio items",
    });
  }
};

// ===============================
// Update Portfolio Item
// ===============================
export const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, image } = req.body;

    const portfolio = await Portfolio.findByIdAndUpdate(
      id,
      {
        title,
        category,
        image,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio item updated successfully",
      data: portfolio,
    });
  } catch (error) {
    console.error("Update Portfolio Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update portfolio item",
    });
  }
};

// ===============================
// Delete Portfolio Item
// ===============================
export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const portfolio = await Portfolio.findByIdAndDelete(id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio item deleted successfully",
    });
  } catch (error) {
    console.error("Delete Portfolio Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete portfolio item",
    });
  }
};
