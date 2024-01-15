export interface IFinancialPosition {
  id: number;
  accrued_interest: number;
  number_of_shares: number;
  balance: number;
  capital_gain: number;
  cost: number;
  currency: string;
  entity: string;
  expiration_date: string;
  initial_date: string;
  interest_rate: number;
  is_nominal: boolean;
  isin: string;
  market: string;
  name: string;
  portfolio_id: string;
  type: string;
  valuation_date: string;
  rate_to_euro: number;
}
