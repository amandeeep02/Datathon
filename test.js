// test.js

class TechnicalIndicators {
    constructor(data) {
        this.data = data.chart.result[0];
        this.prices = this.data.indicators.quote[0];
    }

    // 1. Relative Strength Index (RSI)
    calculateRSI(period = 14) {
        const closes = this.prices.close;
        let gains = [];
        let losses = [];
        
        for(let i = 1; i < closes.length; i++) {
            const difference = closes[i] - closes[i-1];
            gains.push(difference > 0 ? difference : 0);
            losses.push(difference < 0 ? Math.abs(difference) : 0);
        }

        const avgGain = gains.slice(0, period).reduce((a,b) => a + b) / period;
        const avgLoss = losses.slice(0, period).reduce((a,b) => a + b) / period;
        
        return 100 - (100 / (1 + (avgGain / avgLoss)));
    }

    // 2. Moving Average Convergence Divergence (MACD)
    calculateMACD(shortPeriod = 12, longPeriod = 26, signalPeriod = 9) {
        const closes = this.prices.close;
        const shortEMA = this.calculateEMA(closes, shortPeriod);
        const longEMA = this.calculateEMA(closes, longPeriod);
        const macdLine = shortEMA - longEMA;
        const signalLine = this.calculateEMA([macdLine], signalPeriod);
        
        return {
            macdLine,
            signalLine,
            histogram: macdLine - signalLine
        };
    }

    // 3. Bollinger Bands
    calculateBollingerBands(period = 20, stdDev = 2) {
        const closes = this.prices.close;
        const sma = this.calculateSMA(closes, period);
        const standardDeviation = this.calculateStandardDeviation(closes, period);
        
        return {
            middle: sma,
            upper: sma + (standardDeviation * stdDev),
            lower: sma - (standardDeviation * stdDev)
        };
    }

    // Helper Methods
    calculateEMA(data, period) {
        const multiplier = 2 / (period + 1);
        let ema = data[0];
        
        for(let i = 1; i < data.length; i++) {
            ema = (data[i] * multiplier) + (ema * (1 - multiplier));
        }
        
        return ema;
    }

    calculateSMA(data, period) {
        return data.slice(-period).reduce((a,b) => a + b) / period;
    }

    calculateStandardDeviation(data, period) {
        const mean = this.calculateSMA(data, period);
        const squaredDifferences = data.slice(-period).map(x => Math.pow(x - mean, 2));
        return Math.sqrt(squaredDifferences.reduce((a,b) => a + b) / period);
    }

    // 4. Volume Analysis
    calculateVolumeProfile() {
        return {
            averageVolume: this.calculateSMA(this.prices.volume, 20),
            volumeChange: (this.prices.volume[this.prices.volume.length-1] / 
                          this.prices.volume[this.prices.volume.length-2] - 1) * 100
        };
    }

    // Generate Trading Score
    generateTradingScore() {
        const rsi = this.calculateRSI();
        const macd = this.calculateMACD();
        const bb = this.calculateBollingerBands();
        const volume = this.calculateVolumeProfile();
        
        let score = 0;
        
        // RSI Analysis (0-30)
        if(rsi < 30) score += 25; // Oversold
        else if(rsi > 70) score -= 25; // Overbought
        else score += 15; // Neutral
        
        // MACD Analysis (0-30)
        if(macd.histogram > 0 && macd.macdLine > 0) score += 30;
        else if(macd.histogram < 0 && macd.macdLine < 0) score -= 30;
        
        // Bollinger Bands Analysis (0-20)
        const currentPrice = this.prices.close[this.prices.close.length-1];
        if(currentPrice < bb.lower) score += 20;
        else if(currentPrice > bb.upper) score -= 20;
        
        // Volume Analysis (0-20)
        if(volume.volumeChange > 20) score += 20;
        else if(volume.volumeChange > 10) score += 10;
        
        return {
            totalScore: score,
            interpretation: this.interpretScore(score),
            technicalIndicators: {
                rsi,
                macd,
                bollingerBands: bb,
                volumeMetrics: volume
            }
        };
    }

    interpretScore(score) {
        if(score >= 60) return "Strong Buy";
        if(score >= 20) return "Buy";
        if(score >= -20) return "Neutral";
        if(score >= -60) return "Sell";
        return "Strong Sell";
    }
}

// Usage Example
const data = require('./relaince-before-5d.json');
const analyzer = new TechnicalIndicators(data);
console.log(analyzer.generateTradingScore());