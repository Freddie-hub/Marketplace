export interface StoredUser {
    id: string;
    email: string;
    role: 'ADMINISTRATOR' | 'WAREHOUSE_GUY' | 'BUYER' | 'FARMER' | 'SELLER';
    firstName?: string;
    lastName?: string;
    displayName?: string;
  }
  