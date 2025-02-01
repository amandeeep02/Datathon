import React from "react";
import { TimeFrameOption } from "./stock/stock.type";

const timeFrameOptions: TimeFrameOption[] = [
  { label: "Daily (1 Month)", interval: "1d", range: "1mo" },
  { label: "Intraday", interval: "5m", range: "1d" },
  { label: "Weekly (1 Year)", interval: "1wk", range: "1y" },
  { label: "Historical", interval: "1d", range: "max" },
];

interface TimeFrameProps {
  onSelect: (interval: string, range: string) => void;
}

export const TimeFrame: React.FC<TimeFrameProps> = ({ onSelect }) => (
  <select
    onChange={(e) => {
      const option = timeFrameOptions[e.target.selectedIndex];
      onSelect(option.interval, option.range);
    }}
    className="p-2 rounded-md border border-gray-300"
  >
    {timeFrameOptions.map((option) => (
      <option key={option.label} value={option.label}>
        {option.label}
      </option>
    ))}
  </select>
);
