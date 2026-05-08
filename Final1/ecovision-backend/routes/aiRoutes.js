const express = require("express");
const router = express.Router();

const zones = require("../data/zones");
const { getAIPrediction } = require("../services/aiService");

router.get("/predict/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const zone = zones.find((z) => z.id === id);

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    const aiResult = await getAIPrediction(zone);

    res.json({
      success: true,
      zone: zone.name,
      data: zone,
      ai: aiResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "AI prediction failed",
      error: error.message,
    });
  }
});

module.exports = router;