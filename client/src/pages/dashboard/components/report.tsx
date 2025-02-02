import React, { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { AlertCircle, TrendingUp, TrendingDown, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FinancialData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  marketShare: number;
  operatingCosts: number;
  marketingCosts: number;
  customerAcquisition: number;
  retention: number;
}

interface Metrics {
  revenueGrowth: string;
  profitGrowth: string;
  marketShareGrowth: string;
  operatingMargin: string;
  costEfficiencyRatio: string;
  customerAcquisitionCost: string;
  revenueAcceleration: string;
  profitAcceleration: string;
  currentRevenue: number;
  currentProfit: number;
  currentMarketShare: number;
  customerRetention: number;
}

interface CostBreakdown {
  name: string;
  value: number;
}

const FinancialReportGenerator: React.FC = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const [financialData] = useState<FinancialData[]>([
    {
      month: "Jan",
      revenue: 150000,
      expenses: 120000,
      profit: 30000,
      marketShare: 15,
      operatingCosts: 90000,
      marketingCosts: 30000,
      customerAcquisition: 1200,
      retention: 85,
    },
    {
      month: "Feb",
      revenue: 165000,
      expenses: 125000,
      profit: 40000,
      marketShare: 16,
      operatingCosts: 95000,
      marketingCosts: 30000,
      customerAcquisition: 1300,
      retention: 86,
    },
    {
      month: "Mar",
      revenue: 180000,
      expenses: 130000,
      profit: 50000,
      marketShare: 17,
      operatingCosts: 98000,
      marketingCosts: 32000,
      customerAcquisition: 1400,
      retention: 87,
    },
    {
      month: "Apr",
      revenue: 200000,
      expenses: 140000,
      profit: 60000,
      marketShare: 18,
      operatingCosts: 100000,
      marketingCosts: 40000,
      customerAcquisition: 1500,
      retention: 88,
    },
  ]);

  const calculateAdvancedMetrics = (data: FinancialData[]): Metrics => {
    if (data.length < 2) {
      return {
        revenueGrowth: "0",
        profitGrowth: "0",
        marketShareGrowth: "0",
        operatingMargin: "0",
        costEfficiencyRatio: "0",
        customerAcquisitionCost: "0",
        revenueAcceleration: "0",
        profitAcceleration: "0",
        currentRevenue: data[0]?.revenue || 0,
        currentProfit: data[0]?.profit || 0,
        currentMarketShare: data[0]?.marketShare || 0,
        customerRetention: data[0]?.retention || 0,
      };
    }

    const latest = data[data.length - 1];
    const previous = data[data.length - 2];

    const revenueGrowth =
      ((latest.revenue - previous.revenue) / previous.revenue) * 100;
    const profitGrowth =
      ((latest.profit - previous.profit) / previous.profit) * 100;
    const marketShareGrowth = latest.marketShare - previous.marketShare;
    const operatingMargin = (latest.profit / latest.revenue) * 100;
    const costEfficiencyRatio = latest.revenue / latest.operatingCosts;
    const customerAcquisitionCost =
      latest.marketingCosts / latest.customerAcquisition;

    return {
      revenueGrowth: revenueGrowth.toFixed(1),
      profitGrowth: profitGrowth.toFixed(1),
      marketShareGrowth: marketShareGrowth.toFixed(1),
      operatingMargin: operatingMargin.toFixed(1),
      costEfficiencyRatio: costEfficiencyRatio.toFixed(2),
      customerAcquisitionCost: customerAcquisitionCost.toFixed(0),
      revenueAcceleration: "0",
      profitAcceleration: "0",
      currentRevenue: latest.revenue,
      currentProfit: latest.profit,
      currentMarketShare: latest.marketShare,
      customerRetention: latest.retention,
    };
  };

  const exportToCSV = () => {
    const headers = [
      "Month",
      "Revenue",
      "Expenses",
      "Profit",
      "Market Share",
      "Operating Costs",
      "Marketing Costs",
      "Customer Acquisition",
      "Retention",
    ];

    const csvData = [
      headers.join(","),
      ...financialData.map((row) =>
        [
          row.month,
          row.revenue,
          row.expenses,
          row.profit,
          row.marketShare,
          row.operatingCosts,
          row.marketingCosts,
          row.customerAcquisition,
          row.retention,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `financial_report_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      exportToCSV();
    } catch (error) {
      console.error("Error exporting report:", error);
    }
    setIsExporting(false);
  };

  const metrics = calculateAdvancedMetrics(financialData);

  const costBreakdown: CostBreakdown[] = [
    {
      name: "Operating Costs",
      value: financialData[financialData.length - 1].operatingCosts,
    },
    {
      name: "Marketing Costs",
      value: financialData[financialData.length - 1].marketingCosts,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6" ref={reportRef}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Financial Performance Report</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          disabled={isExporting}
        >
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? "Exporting..." : "Export Report"}
        </Button>
      </div>

      {/* Rest of the component remains the same */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Revenue Growth</p>
                <h3 className="text-2xl font-bold">{metrics.revenueGrowth}%</h3>
              </div>
              {parseFloat(metrics.revenueGrowth) > 0 ? (
                <TrendingUp className="w-8 h-8 text-green-500" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Profit Margin</p>
                <h3 className="text-2xl font-bold">
                  {metrics.operatingMargin}%
                </h3>
              </div>
              {parseFloat(metrics.operatingMargin) > 20 ? (
                <TrendingUp className="w-8 h-8 text-green-500" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Market Share</p>
                <h3 className="text-2xl font-bold">
                  {metrics.currentMarketShare}%
                </h3>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Customer Retention</p>
                <h3 className="text-2xl font-bold">
                  {metrics.customerRetention}%
                </h3>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue & Profit Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart width={1000} height={300} data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#0088FE" />
            <Line type="monotone" dataKey="profit" stroke="#00C49F" />
          </LineChart>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Cost Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart width={400} height={300}>
              <Pie
                data={costBreakdown}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {costBreakdown.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={400} height={300} data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="customerAcquisition" fill="#0088FE" />
              <Bar dataKey="retention" fill="#00C49F" />
            </BarChart>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Revenue growth is trending positively with a {metrics.revenueGrowth}%
          increase. Customer retention remains strong at{" "}
          {metrics.customerRetention}%.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default FinancialReportGenerator;
