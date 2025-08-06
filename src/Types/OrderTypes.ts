export interface PaymentMethod {
  type: string;
  cardNumber?: string | null;
}

export interface MenuRef {
  _id: string;
  itemName: string;
  price: number;
  size: string;
}

export interface OrderMenuItem {
  menu: MenuRef;
  quantity: number;
  _id: string;
  itemName: string;
  capacity?: string | TableRef// Optional, if applicable
}

export interface Restaurant {
  _id: string;
  owner: string;
  restaurantName: string;
  menus: string[];
  status: string;
  restaurantAddress: string;
  phone: string;
  logo: string;
  tagline: string;
  coverPhoto: string;
  images: string[];
  description: string;
  isDeleted: boolean;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  __v: number;
}

export interface TableRef {
  _id: string;
  name: string;
  capacity?: number;
  // ...other fields if needed
}

export interface Order {
  paymentMethod: PaymentMethod;
  _id: string;
  restaurant: Restaurant;
  table: string | TableRef;
  floor: string;
  orderId: string;
  person: number;
  menus: OrderMenuItem[];
  customerName: string;
  customerPhone: string;
  orderType: string;
  specialRequest: string;
  total: number;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  type: string; // e.g., "dine-in", "take-away"
  date: string; // or Date
  time: string; // or Date,
  items: OrderMenuItem[];
  subtotal: number;
  discountPercent: number;
  createdAtFormatted: string; // Formatted date string,
  updatedAtFormatted?: string;
  capacity: number; // Number of people the table can accommodate
  floorName: string; // Name of the floor
  deliveryStatus?: string;
}
