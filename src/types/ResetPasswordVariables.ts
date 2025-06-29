export interface ResetPasswordVariables {
  args: {
    token: string;
    newPassword: string;
    confirmPassword: string;
  };
}
