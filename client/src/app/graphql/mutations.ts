import { gql } from '@apollo/client';
export const CREATE_USER_MUTATION = gql`
  mutation CreateFarmer($args: FarmerRegistrationArgs!) {
    createFarmer(args: $args) {
      status
      message
      token
      user {
        id
        email
        Fname
        Lname
        role
        emailVerified
      }
    }
  }
`;