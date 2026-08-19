export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  created_at: Date;
}

export interface Category {
  id: number;
  name: string;
  description?: string | null;
  created_at: Date;
}

export interface Product {
    id: number;
    category_id: number;
    name: string;
    description?: string | null;
    price: number;
    stock: number;
    active: boolean;
    created_at: Date;
}

export interface Coupon {
    id: number;
    code: string;
    discount_type: string;
    discount_value: number;
    expires_at?: Date | null;
    usage_limit?: number | null;
    used_count: number;
    active: boolean;
    created_at: Date;
}

export interface Order {
    id: number;
    customer_id: number;
    coupon_id?: number | null;
    status: string;
    subtotal: number;
    discount: number;
    total: number;
    stripe_session_id?: string | null;
    created_at: Date;
}
export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
}

export interface PaymentAttempt {
    id: number;
    order_id: number;
    stripe_payment_intent?: string | null;
    status: string;
    amount: number;
    error_message?: string | null;
    created_at: Date;
}

export interface IEmailPayload {
  to: string;
  subject: string;
  text: string;
  html: string;
}   

export interface CreateOrderInput {
    customer_id: number;
    coupon_id?: number | null;
    items: {
        product_id: number;
        quantity: number;
    }[];
}