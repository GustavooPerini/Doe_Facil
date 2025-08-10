export interface ItemResponse {
  id: number;
  title: string;
  description?: string;
  category: string; // nome da categoria vindo do backend
  city: string;
  state: string;
  status: 'AVAILABLE' | 'RESERVED' | 'DONATED' | 'REMOVED';
  createdAt: string; // ISO
  ownerId: number;
}