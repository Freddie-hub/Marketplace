export interface ResetPasswordResponse {
    resetPassword: {
      status: string;
      message: string;
      token?: string;
      user?: {
        id: string;
        email: string;
        Fname: string;
      };
    };
  }