import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { TimeFrame } from "./timeframe";
import { fetchStockData } from "./stock/stock.service";
import { StockData } from "./stock/stock.type";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Overview() {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);

  const loadStockData = async (interval: string, range: string) => {
    setLoading(true);
    try {
      const data = await fetchStockData("RELIANCE.NS", interval, range);
      setStockData(data);
    } catch (error) {
      console.error("Failed to fetch stock data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStockData("1d", "1mo");
  }, []);

  const chartData = stockData
    ? {
        labels: stockData.chart.result[0].timestamp.map((ts) =>
          new Date(ts * 1000).toLocaleDateString()
        ),
        datasets: [
          {
            label: "Stock Price",
            data: stockData.chart.result[0].indicators.quote[0].close,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      }
    : null;

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <TimeFrame onSelect={loadStockData} />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        chartData && (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Stock Price Chart" },
              },
            }}
          />
        )
      )}
    </div>
  );
}
