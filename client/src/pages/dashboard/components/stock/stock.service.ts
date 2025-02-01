import axios from "axios";
import { StockData } from "./stock.type";

export const fetchStockData = async (
  symbol: string,
  interval: string,
  range: string
): Promise<StockData> => {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;
  const response = await axios.get<StockData>(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
  });
  console.log(response.data);
  return response.data;
};
