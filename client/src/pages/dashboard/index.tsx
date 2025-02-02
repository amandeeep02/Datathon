import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  MessageCircle,
} from "lucide-react";
import Overview from "./components/overview";
import TopStocks from "./components/top-stocks";
import StockAnalysis from "./components/analysis";
import Report from "./components/report";

export default function DashboardPage() {
  return (
    <>
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Your Portfolio Dashboard
          </h2>
          <Button
            onClick={() => window.open("http://t.me/temmmmmp_bot", "_blank")}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Talk to Our Chatbot
          </Button>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="Analysis">Analysis</TabsTrigger>
            <TabsTrigger value="Reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Portfolio Value
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹15,43,231</div>
                  <p className="text-xs text-green-500">+5.2% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Day's Gain/Loss
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+₹12,350</div>
                  <p className="text-xs text-muted-foreground">
                    15 stocks up, 3 down
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Return
                  </CardTitle>
                  <Percent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+22.4%</div>
                  <p className="text-xs text-muted-foreground">
                    Since inception
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Market Status
                  </CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">17,573</div>
                  <p className="text-xs text-red-500">Nifty 50 -1.2%</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>
                    Your best performing stocks today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TopStocks />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="Analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Analysis</CardTitle>
                <CardDescription>
                  Detailed view of all your stock positions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StockAnalysis />
                <p className="text-sm text-muted-foreground">
                  Analysis details will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="Reports" className="space-y-4">
            <Report />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
