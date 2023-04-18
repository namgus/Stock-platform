export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

export interface CryptoOrder {
  id: string;
  name: string;
  status: CryptoOrderStatus;
  orderDate: number;
  bps: number;
  per: number;
  pbr: number;
  eps: number;
  div: number;
  dps: number;
  sentiment: string;
}
