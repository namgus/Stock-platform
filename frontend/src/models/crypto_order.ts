export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

export interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  orderDate: number;
  bps: number;
  per: number;
  pbr: number;
  eps: number;
  div: number;
  dps: number;
}
