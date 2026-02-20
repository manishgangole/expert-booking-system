const Expert = require("../models/Expert");

// GET /experts (with pagination + search + filter)
exports.getExperts = async (req, res) => {
  try {
    const { page = 1, limit = 5, search, category } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const experts = await Expert.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Expert.countDocuments(query);

    res.json({ experts, total });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// GET /experts/:id
exports.getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);

    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    res.json(expert);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};