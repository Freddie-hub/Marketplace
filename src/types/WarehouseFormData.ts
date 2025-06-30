export interface WarehouseFormData {
  email: string;
  password: string;
  confirmPassword: string;
  Fname: string;
  Mname?: string;
  Lname: string;
  phone?: string;
  address?: string;
  warehouseName: string;
  warehouseLocation: string;
  warehouseAddress?: string;
  warehouseCapacity?: number;
  warehousePhone?: string;
  warehouseEmail?: string;
}

export interface WarehouseRegistrationArgs {
  email: string;
  password: string;
  Fname: string;
  Mname?: string;
  Lname: string;
  phone?: string;
  address?: string;
  warehouse_name: string;
  warehouse_location: string;
  warehouse_address?: string;
  warehouse_capacity?: string;
  warehouse_phone?: string;
  warehouse_email?: string;
}