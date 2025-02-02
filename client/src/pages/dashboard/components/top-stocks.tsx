// import React from "react";
import { TrendingUp, Star, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StockItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const TopStocks = () => {
  const topPerformers: StockItem[] = [
    {
      symbol: "INFY",
      name: "Infosys Ltd.",
      price: 1567.8,
      change: 45.2,
      changePercent: 2.97,
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      price: 3456.75,
      change: 87.3,
      changePercent: 2.59,
    },
    {
      symbol: "WIPRO",
      name: "Wipro Ltd.",
      price: 432.15,
      change: 8.45,
      changePercent: 1.99,
    },
    {
      symbol: "SBIN",
      name: "State Bank of India",
      price: 345.6,
      change: 6.8,
      changePercent: 1.99,
    },
    {
      symbol: "HDFC",
      name: "HDFC Bank Ltd.",
      price: 1678.9,
      change: 23.45,
      changePercent: 1.42,
    },
    {
      symbol: "RELIANCE",
      name: "Reliance Industries",
      price: 2345.6,
      change: 34.2,
      changePercent: 1.48,
    },
  ];

  const suggestions: StockItem[] = [
    {
      symbol: "HDFC",
      name: "HDFC Bank Ltd.",
      price: 1678.9,
      change: 23.45,
      changePercent: 1.42,
    },
    {
      symbol: "RELIANCE",
      name: "Reliance Industries",
      price: 2345.6,
      change: 34.2,
      changePercent: 1.48,
    },
    {
      symbol: "ICICI",
      name: "ICICI Bank Ltd.",
      price: 897.3,
      change: 12.8,
      changePercent: 1.45,
    },
    {
      symbol: "AXIS",
      name: "Axis Bank Ltd.",
      price: 654.8,
      change: 9.2,
      changePercent: 1.42,
    },
    {
      symbol: "ITC",
      name: "ITC Ltd.",
      price: 234.6,
      change: 3.4,
      changePercent: 1.48,
    },
    {
      symbol: "ONGC",
      name: "Oil and Natural Gas Corporation",
      price: 123.45,
      change: 1.8,
      changePercent: 1.48,
    },
  
  ];

  const StockList = ({ stocks }: { stocks: StockItem[] }) => (
    <div className="space-y-4">
      {stocks.map((stock) => (
        <div
          key={stock.symbol}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{stock.symbol}</span>
              {stock.changePercent > 2 && (
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              )}
            </div>
            <span className="text-sm text-muted-foreground">{stock.name}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-medium">₹{stock.price.toFixed(2)}</span>
            <div
              className={`flex items-center gap-1 text-sm ${
                stock.change > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              <TrendingUp
                className={`h-4 w-4 ${stock.change < 0 && "rotate-180"}`}
              />
              <span>{stock.changePercent.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <TooltipProvider>
      <Tabs defaultValue="performing" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="performing">Top Performers</TabsTrigger>
            <TabsTrigger value="suggested">Suggested</TabsTrigger>
          </TabsList>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Suggestions based on your portfolio and market trends</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <TabsContent value="performing" className="mt-0">
          <StockList stocks={topPerformers} />
        </TabsContent>

        <TabsContent value="suggested" className="mt-0">
          <div className="mb-3 text-sm text-muted-foreground">
            Based on your investment patterns
          </div>
          <StockList stocks={suggestions} />
        </TabsContent>
      </Tabs>
    </TooltipProvider>
  );
};

export default TopStocks;
