import { gql } from "@apollo/client";

export const UPDATE_FARMER_PAYMENT_DETAILS = gql`
  mutation UpdateFarmerPaymentDetails($mpesaNumber: String!) {
    updateFarmerPaymentDetails(mpesaNumber: $mpesaNumber) {
      success
      message
    }
  }
`;