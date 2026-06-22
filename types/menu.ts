export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: 'biryani' | 'starters' | 'main' | 'sides' | 'beverages';
  isVegan: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}
