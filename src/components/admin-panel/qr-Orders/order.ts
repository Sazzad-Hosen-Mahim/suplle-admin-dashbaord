export type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  vendor: string;
  status: OrderStatus;
  time: string;
}