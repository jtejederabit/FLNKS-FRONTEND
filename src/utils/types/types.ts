export interface ISummary {
  totalBalance: number;
  distributionByCurrency: Record<string, number>;
  distributionByType: Record<string, number>;
  distributionByEntity: Record<string, number>;
}

export interface IHistoricalData {
  cost: number;
  initial_date: string;
  year?: number;
}

export interface IAggregationData {
  cost: number;
  year: number ;
}