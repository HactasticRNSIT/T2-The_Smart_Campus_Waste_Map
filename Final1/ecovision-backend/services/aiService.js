require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getAIPrediction(zone) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an AI for a smart campus waste monitoring system.

Zone data:
Name: ${zone.name}
Occupancy: ${zone.occupancy}%
Waste Level: ${zone.wasteLevel}%
Crowd Level: ${zone.crowdLevel}
Current Risk: ${zone.risk}

Return ONLY valid JSON:
{
  "riskLevel": "Low / Moderate / High / Overflow",
  "prediction": "short prediction",
  "action": "short action suggestion"
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    return {
      riskLevel: zone.risk,
      prediction: text,
      action: "Check this zone manually",
    };
  }
}

module.exports = { getAIPrediction };
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

console.log("Using model: gemini-2.0-flash");