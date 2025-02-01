import React from "react";
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

// Register the required chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CandleData {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandleChartProps {
  data: CandleData[];
}

const CandleChart: React.FC<CandleChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Stock Price",
        data: data.map((item) => ({
          x: item.label,
          y: item.close,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        })),
        backgroundColor: data.map((item) =>
          item.open > item.close
            ? "rgba(255, 99, 132, 0.8)"
            : "rgba(75, 192, 192, 0.8)"
        ),
        borderColor: data.map((item) =>
          item.open > item.close ? "rgb(255, 99, 132)" : "rgb(75, 192, 192)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const dataPoint = context.raw;
            return [
              `Open: $${dataPoint.open.toFixed(2)}`,
              `High: $${dataPoint.high.toFixed(2)}`,
              `Low: $${dataPoint.low.toFixed(2)}`,
              `Close: $${dataPoint.close.toFixed(2)}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        type: "category" as const,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

const Overview: React.FC = () => {
  const sampleData: CandleData[] = [
    { label: "Mon", open: 100, high: 110, low: 95, close: 105 },
    { label: "Tue", open: 105, high: 115, low: 100, close: 110 },
    { label: "Wed", open: 110, high: 120, low: 108, close: 115 },
    { label: "Thu", open: 115, high: 118, low: 112, close: 113 },
    { label: "Fri", open: 113, high: 116, low: 110, close: 112 },
  ];

  return (
    <div className="w-full p-4">
      <CandleChart data={sampleData} />
    </div>
  );
};

export default Overview;
