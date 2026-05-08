const express = require("express");
const router = express.Router();

let zones = require("../data/zones");

// GET all live data
router.get("/", (req, res) => {
  res.json({
    success: true,
    zones,
  });
});

// UPDATE zone data
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const zone = zones.find((z) => z.id === id);

  if (!zone) {
    return res.status(404).json({
      success: false,
      message: "Zone not found",
    });
  }

  zone.occupancy = req.body.occupancy ?? zone.occupancy;
  zone.wasteLevel = req.body.wasteLevel ?? zone.wasteLevel;
  zone.crowdLevel = req.body.crowdLevel ?? zone.crowdLevel;

  // AI Risk Logic
  if (zone.wasteLevel > 85 || zone.occupancy > 90) {
    zone.risk = "Overflow Risk";
  } else if (zone.wasteLevel > 70 || zone.occupancy > 75) {
    zone.risk = "High Risk";
  } else if (zone.wasteLevel > 45 || zone.occupancy > 50) {
    zone.risk = "Moderate Risk";
  } else {
    zone.risk = "Low Risk";
  }

  res.json({
    success: true,
    message: "Zone updated",
    zone,
  });
});

module.exports = router;