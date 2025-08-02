export interface CropInput {
  name: string;
  quantity: number;
}

export interface InviteFarmerInput {
  name: string;
  email: string;
  crops: CropInput[];
  warehouseId: number;
}

export interface InvitationResponse {
  success: boolean;
  message: string;
  redirectUrl?: string;
}