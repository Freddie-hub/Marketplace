export interface User{
    email:string
    password:string
    Fname:string
    role: "ADMINISTRATOR" | "FARMER" | "BUYER" | "WAREHOUSE_GUY"
    Mname:string
    Lname:string
    phone:string
    address:string
    photo:string
  }