export interface CustomerSri {
  phone?: string;
  email?: string;
  idCard: string;
  businessName: string;
  address?: string;
}

export interface CustomerSriRequest {
  identificationNumber: string;
  sriOnly?: boolean; // opcional
}
