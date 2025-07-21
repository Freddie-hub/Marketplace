export interface GoogleUserData {
    email: string;
    Fname: string;
    Lname?: string;
    googleId: string;
    photo?: string;
  }
  
  export interface GoogleSignupInput {
    googleUserData: GoogleUserData;
    role: 'FARMER' | 'BUYER' | 'WAREHOUSE_GUY';
    warehouse_name?: string;
    warehouse_location?: string;
    warehouse_address?: string;
    warehouse_capacity?: number;
    warehouse_phone?: string;
    warehouse_email?: string;
  }