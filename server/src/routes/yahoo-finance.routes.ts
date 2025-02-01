import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/yahoo-finance", async (req, res) => {
  try {
    const { symbol, interval, range } = req.query;
    const response = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

export default router;
