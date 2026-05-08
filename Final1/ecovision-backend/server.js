const express = require("express");
const cors = require("cors");
require("dotenv").config();

const liveRoutes = require("./routes/liveRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("EcoVision Backend Running");
});

app.use("/api/live", liveRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});