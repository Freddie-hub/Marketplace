import { User } from "./UserTypes";

export interface LoginResponse {
    Login: {  
      status: string;
      message: string;
      token: string;
      user?: User;
    };
  }