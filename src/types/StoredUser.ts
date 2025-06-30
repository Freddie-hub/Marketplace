export interface StoredUser {
    id: string;
    email: string;
    role: 'ADMINISTRATOR' | 'WAREHOUSE_GUY' | 'BUYER' | 'FARMER' | 'SELLER';
    firstName?: string;
    Fname?:string;
    Lname?:string;
    warehouse?:{
      id:number;
      name:string;
    },
    Mname?:string;
    lastName?: string;
    displayName?: string;
  }
  