export interface ItemCreate {
  title: string;
  description?: string;
  categoryId: number;
  city: string;
  state: string; // UF
}