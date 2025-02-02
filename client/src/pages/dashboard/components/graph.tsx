import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Import company data
import RelianceData1 from "../../../data/Reliance/1.json";
import RelianceData2 from "../../../data/Reliance/2.json";
import RelianceData3 from "../../../data/Reliance/3.json";
import RelianceData4 from "../../../data/Reliance/4.json";

import InfosysData1 from "../../../data/Infosys/1.json";
import InfosysData2 from "../../../data/Infosys/2.json";
import InfosysData3 from "../../../data/Infosys/3.json";
import InfosysData4 from "../../../data/Infosys/4.json";

import TCSData1 from "../../../data/TCS/1.json";
import TCSData2 from "../../../data/TCS/2.json";
import TCSData3 from "../../../data/TCS/3.json";
import TCSData4 from "../../../data/TCS/4.json";

import HDFCData1 from "../../../data/HDFC/1.json";
import HDFCData2 from "../../../data/HDFC/2.json";
import HDFCData3 from "../../../data/HDFC/3.json";
import HDFCData4 from "../../../data/HDFC/4.json";

import SBIData1 from "../../../data/SBI/1.json";
import SBIData2 from "../../../data/SBI/2.json";
import SBIData3 from "../../../data/SBI/3.json";
import SBIData4 from "../../../data/SBI/4.json";

const companies = [
  {
    label: "Reliance",
    data: [RelianceData1, RelianceData2, RelianceData3, RelianceData4],
  },
  {
    label: "Infosys",
    data: [InfosysData1, InfosysData2, InfosysData3, InfosysData4],
  },
  {
    label: "TCS",
    data: [TCSData1, TCSData2, TCSData3, TCSData4],
  },
  {
    label: "HDFC",
    data: [HDFCData1, HDFCData2, HDFCData3, HDFCData4],
  },
  {
    label: "SBI",
    data: [SBIData1, SBIData2, SBIData3, SBIData4],
  },
];

const timeFrames = [
  { label: "Intraday", color: "rgba(75, 192, 192, 0.6)" },
  { label: "Daily (1 Month)", color: "rgba(54, 162, 235, 0.6)" },
  { label: "Weekly (1 Year)", color: "rgba(153, 102, 255, 0.6)" },
  { label: "Historical", color: "rgba(255, 159, 64, 0.6)" },
];

export default function StockGraphs() {
  const [selectedCompany, setSelectedCompany] = useState(0);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(0);
  const chartId = `chart-${selectedCompany}-${selectedTimeFrame}`;

  useEffect(() => {
    return () => {
      const chart = ChartJS.getChart(chartId);
      if (chart) {
        chart.destroy();
      }
    };
  }, [selectedCompany, selectedTimeFrame, chartId]);

  const getChartData = (data: any, color: string) => ({
    labels: data.chart.result[0].timestamp.map((ts: number) =>
      new Date(ts * 1000).toLocaleDateString()
    ),
    datasets: [
      {
        label: `${companies[selectedCompany].label} Stock Price`,
        data: data.chart.result[0].indicators.quote[0].close,
        fill: false,
        borderColor: color,
        tension: 0.1,
      },
    ],
  });

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${companies[selectedCompany].label} - ${timeFrames[selectedTimeFrame].label}`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `₹${value}`,
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div className="w-full p-4">
      <div className="flex gap-4 mb-4">
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(Number(e.target.value))}
          className="p-2 border rounded"
        >
          {companies.map((company, index) => (
            <option key={company.label} value={index}>
              {company.label}
            </option>
          ))}
        </select>

        <select
          value={selectedTimeFrame}
          onChange={(e) => setSelectedTimeFrame(Number(e.target.value))}
          className="p-2 border rounded"
        >
          {timeFrames.map((tf, index) => (
            <option key={tf.label} value={index}>
              {tf.label}
            </option>
          ))}
        </select>
      </div>

      <div className="h-[400px]">
        <Line
          id={chartId}
          options={options}
          data={getChartData(
            companies[selectedCompany].data[selectedTimeFrame],
            timeFrames[selectedTimeFrame].color
          )}
        />
      </div>
    </div>
  );
}
