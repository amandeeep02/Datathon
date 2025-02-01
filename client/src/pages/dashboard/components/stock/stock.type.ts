export interface StockData {
  chart: {
    result: [
      {
        timestamp: number[];
        indicators: {
          quote: [
            {
              open: number[];
              high: number[];
              low: number[];
              close: number[];
              volume: number[];
            }
          ];
        };
        meta: {
          currency: string;
          symbol: string;
          regularMarketPrice: number;
          previousClose: number;
        };
      }
    ];
  };
}

export interface TimeFrameOption {
  label: string;
  interval: string;
  range: string;
}
