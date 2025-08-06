// types/menu.ts
export interface ICategory {
  _id: string;
  restaurant: string;
  categoryName: string;
  description: string;
  image: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IMenuItem {
  _id: string;
  category: ICategory;
  restaurant: string;
  itemName: string;
  image: string;
  price: number;
  size: string;
  availability: string;
  description: string;
  rating: number;
  like: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IMenuResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    result: IMenuItem[];
    meta: IMeta;
  };
}

export interface MenuState {
  menus: IMenuItem[];
  loading: boolean;
  error: string | null;
  meta: IMeta | null;
}
