export interface Entry {
  id: number;
  date: string;
  quantity: number;
  price: number;
  cost: number;
  note: string;
}

export interface DailySummary {
  date: string;
  quantity: number;
  cost: number;
}

export interface Summary {
  month?: string;
  quantity: number;
  cost: number;
  count: number;
  daily: DailySummary[];
}

export interface Delivery {
  date: string;
  quantity: string;
  note: string;
}
