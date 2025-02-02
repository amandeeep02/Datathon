import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Twitter,
  MessageSquare,
  TrendingUp,
  LinkedinIcon,
  Globe,
  BarChart4,
  Scale,
  LineChart as LineChartIcon,
  Shield,
  Target,
  History,
} from "lucide-react";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// Extended interfaces
interface HistoricalDataPoint {
  date: string;
  price: number;
  sma: number;
  ema: number;
  volume: number;
  rsi: number;
  macd: number;
  signal: number;
  histogram: number;
  upperBB: number;
  lowerBB: number;
  atr: number;
  obv: number;
  vwap: number;
  cmf: number;
  mfi: number;
  dmi: number;
  adx: number;
}
interface SentimentData {
  platform: string;
  sentiment: number;
  volume: number;
  trending: boolean;
  topKeywords: string[];
  recentMentions: number;
  changePercent: number;
}

interface KeywordSentiment {
  keyword: string;
  sentiment: number;
  mentions: number;
  trending: boolean;
}

interface PatternRecognition {
  pattern: string;
  confidence: number;
  lastOccurrence: string;
  description: string;
  action: string;
}

interface BacktestResult {
  strategy: string;
  returns: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  profitFactor: number;
}

interface RiskMetrics {
  volatility: number;
  beta: number;
  valueAtRisk: number;
  sharpeRatio: number;
  maxDrawdown: number;
  correlationSP500: number;
}
interface TechnicalScores {
  rsi: {
    score: number;
  };
  macd: {
    trend: string;
  };
}

// Add Overall Score
const overallScore = 75; // Example value

// Add Technical Scores data
const technicalScores: TechnicalScores = {
  rsi: {
    score: 72
  },
  macd: {
    trend: "bullish"
  }
};
// ... (previous interfaces remain the same)

const StockAnalysis: React.FC = () => {
  const [selectedStock] = useState<string>("RELIANCE");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("1D");
  const [selectedIndicator, setSelectedIndicator] = useState<string>("price");

  const sentimentData: SentimentData[] = [
    {
      platform: "Twitter",
      sentiment: 78,
      volume: 15000,
      trending: true,
      topKeywords: ["earnings", "growth", "bullish"],
      recentMentions: 1200,
      changePercent: 15,
    },
    {
      platform: "Reddit",
      sentiment: 65,
      volume: 8500,
      trending: false,
      topKeywords: ["analysis", "technical", "resistance"],
      recentMentions: 850,
      changePercent: -5,
    },
    {
      platform: "LinkedIn",
      sentiment: 82,
      volume: 5000,
      trending: true,
      topKeywords: ["institutional", "partnership", "expansion"],
      recentMentions: 600,
      changePercent: 25,
    },
    {
      platform: "StockTwits",
      sentiment: 71,
      volume: 12000,
      trending: true,
      topKeywords: ["breakout", "momentum", "buy"],
      recentMentions: 950,
      changePercent: 10,
    },
  ];

  // Sample data (extended)
  const historicalData: HistoricalDataPoint[] = [
    {
      date: "2024-01",
      price: 2500,
      sma: 2450,
      ema: 2460,
      volume: 1000000,
      rsi: 65,
      macd: 25,
      signal: 20,
      histogram: 5,
      upperBB: 2600,
      lowerBB: 2400,
      atr: 45,
      obv: 500000,
      vwap: 2480,
      cmf: 0.15,
      mfi: 58,
      dmi: 25,
      adx: 22,
    },
    // Add more data points
  ];

  // Pattern Recognition
  const patterns: PatternRecognition[] = [
    {
      pattern: "Head and Shoulders",
      confidence: 85,
      lastOccurrence: "2024-01-15",
      description: "Bearish reversal pattern forming",
      action: "Consider reducing position",
    },
    {
      pattern: "Double Bottom",
      confidence: 75,
      lastOccurrence: "2024-01-10",
      description: "Bullish reversal pattern completed",
      action: "Potential buying opportunity",
    },
  ];

  // Backtesting Results
  const backtestResults: BacktestResult[] = [
    {
      strategy: "Moving Average Crossover",
      returns: 15.5,
      sharpeRatio: 1.8,
      maxDrawdown: -12.3,
      winRate: 65.5,
      profitFactor: 1.75,
    },
    {
      strategy: "RSI + MACD",
      returns: 18.2,
      sharpeRatio: 2.1,
      maxDrawdown: -10.8,
      winRate: 68.2,
      profitFactor: 1.92,
    },
  ];

  // Risk Metrics
  const riskMetrics: RiskMetrics = {
    volatility: 25.5,
    beta: 1.15,
    valueAtRisk: 3.2,
    sharpeRatio: 1.8,
    maxDrawdown: 15.3,
    correlationSP500: 0.75,
  };

  // Risk Score calculation
  const calculateRiskScore = (metrics: RiskMetrics): number => {
    const weights = {
      volatility: 0.25,
      beta: 0.2,
      valueAtRisk: 0.25,
      maxDrawdown: 0.3,
    };

    return (
      (1 - metrics.volatility / 100) * weights.volatility * 100 +
      (1 - metrics.beta) * weights.beta * 100 +
      (1 - metrics.valueAtRisk / 10) * weights.valueAtRisk * 100 +
      (1 - metrics.maxDrawdown / 100) * weights.maxDrawdown * 100
    );
  };

  const riskScore = calculateRiskScore(riskMetrics);

  // Pattern Recognition Card
  const PatternCard: React.FC<{ pattern: PatternRecognition }> = ({
    pattern,
  }) => (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{pattern.pattern}</h3>
        <Badge>{pattern.confidence}% Confidence</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-2">
        {pattern.description}
      </p>
      <div className="flex justify-between text-sm">
        <span>Last seen: {pattern.lastOccurrence}</span>
        <span className="font-medium">{pattern.action}</span>
      </div>
    </div>
  );

  // Keyword Analysis
  const keywordSentiment: KeywordSentiment[] = [
    { keyword: "earnings", sentiment: 85, mentions: 2500, trending: true },
    { keyword: "growth", sentiment: 75, mentions: 1800, trending: true },
    { keyword: "competition", sentiment: 45, mentions: 1200, trending: false },
    { keyword: "management", sentiment: 80, mentions: 900, trending: false },
  ];

  const getFinalVerductReasons = (score: number): string[] => {
    const reasons = [];

    if (technicalScores.rsi.score > 70)
      reasons.push("RSI indicates overbought conditions");
    if (technicalScores.macd.trend === "bullish")
      reasons.push("MACD shows strong momentum");

    const avgSentiment =
      sentimentData.reduce((acc, curr) => acc + curr.sentiment, 0) /
      sentimentData.length;
    if (avgSentiment > 75) reasons.push("Strong positive social sentiment");

    if (riskMetrics.volatility > 30) reasons.push("High market volatility");

    patterns.forEach((pattern) => {
      if (pattern.confidence > 80)
        reasons.push(`${pattern.pattern} pattern detected`);
    });

    return reasons;
  };

  const calculateVerdict = () => {
    const technicalScore = Number(overallScore) * 0.4;
    const sentimentScore =
      (sentimentData.reduce((acc, curr) => acc + curr.sentiment, 0) /
        sentimentData.length) *
      0.3;
    const riskAdjustedScore = (100 - calculateRiskScore(riskMetrics)) * 0.3;

    const finalScore = technicalScore + sentimentScore + riskAdjustedScore;

    return {
      score: finalScore,
      verdict: finalScore >= 70 ? "BUY" : finalScore <= 40 ? "SELL" : "HOLD",
      confidence: Math.min(100, (Math.abs(finalScore - 50) / 50) * 100),
      reasons: getFinalVerductReasons(finalScore),
    };
  };

  const verdict = calculateVerdict();


  // Social Media Sentiment Card Component
  const SentimentCard: React.FC<{ data: SentimentData }> = ({ data }) => (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {data.platform === "Twitter" && <Twitter className="h-4 w-4" />}
          {data.platform === "Reddit" && <MessageSquare className="h-4 w-4" />}
          {data.platform === "LinkedIn" && <LinkedinIcon className="h-4 w-4" />}
          {data.platform === "StockTwits" && <BarChart4 className="h-4 w-4" />}
          <span className="font-medium">{data.platform}</span>
        </div>
        <Badge variant={data.trending ? "default" : "secondary"}>
          {data.changePercent > 0 ? "+" : ""}{data.changePercent}%
        </Badge>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Sentiment Score</span>
          <Progress value={data.sentiment} className="w-32" />
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Volume: </span>
          {data.volume.toLocaleString()} mentions
        </div>
        <div className="flex flex-wrap gap-1">
          {data.topKeywords.map((keyword, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {keyword}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  // Backtest Result Card
  const BacktestCard: React.FC<{ result: BacktestResult }> = ({ result }) => (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="font-medium mb-2">{result.strategy}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Returns</p>
          <p className="font-medium">{result.returns}%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
          <p className="font-medium">{result.sharpeRatio}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Win Rate</p>
          <p className="font-medium">{result.winRate}%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Profit Factor</p>
          <p className="font-medium">{result.profitFactor}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {/* Previous cards remain the same */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Social Media Sentiment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sentimentData.map((data, index) => (
              <SentimentCard key={index} data={data} />
            ))}
          </div>
          <div className="mt-6">
            <h4 className="font-medium mb-3">Trending Keywords Analysis</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {keywordSentiment.map((keyword, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{keyword.keyword}</span>
                    {keyword.trending && (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <Progress value={keyword.sentiment} className="h-1" />
                    <span className="text-sm text-muted-foreground">
                      {keyword.mentions} mentions
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Verdict */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Final Verdict
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center mb-6">
            <Badge 
              className={`text-lg px-6 py-2 mb-4 ${
                verdict.verdict === "BUY" 
                  ? "bg-green-500" 
                  : verdict.verdict === "SELL" 
                    ? "bg-red-500" 
                    : "bg-yellow-500"
              }`}
            >
              {verdict.verdict}
            </Badge>
            <div className="text-4xl font-bold mb-2">{verdict.score.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">
              Confidence: {verdict.confidence.toFixed(1)}%
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Key Factors:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">Technical Analysis</h5>
                <Progress value={Number(overallScore)} className="mb-2" />
                <span className="text-sm text-muted-foreground">
                  Score: {overallScore}
                </span>
              </div>
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">Social Sentiment</h5>
                <Progress 
                  value={sentimentData.reduce((acc, curr) => acc + curr.sentiment, 0) / sentimentData.length} 
                  className="mb-2" 
                />
                <span className="text-sm text-muted-foreground">
                  Score: {(sentimentData.reduce((acc, curr) => acc + curr.sentiment, 0) / sentimentData.length).toFixed(1)}
                </span>
              </div>
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">Risk Assessment</h5>
                <Progress value={riskScore} className="mb-2" />
                <span className="text-sm text-muted-foreground">
                  Score: {riskScore.toFixed(1)}
                </span>
              </div>
            </div>
            <Alert>
              <AlertTitle>Key Observations</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-4 mt-2">
                  {verdict.reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    
      {/* Pattern Recognition */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Pattern Recognition
          </CardTitle>
        </CardHeader>
        <CardContent>
          {patterns.map((pattern, index) => (
            <PatternCard key={index} pattern={pattern} />
          ))}
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span>Risk Score</span>
              <span className="text-2xl font-bold">{riskScore.toFixed(1)}</span>
            </div>
            <Progress value={riskScore} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Volatility</p>
              <p className="font-medium">{riskMetrics.volatility}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Beta</p>
              <p className="font-medium">{riskMetrics.beta}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Value at Risk (95%)
              </p>
              <p className="font-medium">{riskMetrics.valueAtRisk}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Max Drawdown</p>
              <p className="font-medium">{riskMetrics.maxDrawdown}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backtesting Results */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Strategy Backtesting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {backtestResults.map((result, index) => (
              <BacktestCard key={index} result={result} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockAnalysis;
