export type Invoice = {
  id: number;
  payment_method_id: number;
  payment_method: string | null;
  invoice_number: string;
  status: number;
  amount: number;
  currency: string;
  reservation_id: string;
  updated_at: string;
  created_at: string;
  // reservation: null;
};
