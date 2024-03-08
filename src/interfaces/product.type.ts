export interface productTypeRequest {
  name: string;
  description?: string;
  price: number;
}

export interface productTypeResponse {
  id: number;
  name: string;
  description?: string;
  price: number;
  createdAt: string;
}
