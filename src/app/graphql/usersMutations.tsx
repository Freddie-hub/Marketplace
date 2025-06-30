import { gql } from '@apollo/client';
export const CREATE_USER_MUTATION = gql`
mutation CreateFarmer($args: FarmerArgs) {
  createFarmer(args: $args) {
    status
    message
  }
}
`;

export const CREATE_FARMER_OR_BUYER_MUTATION = gql`
  mutation CreateFarmer($args: FarmerArgs) {
    createFarmer(args: $args) {
      status
      message
      token
    }
  }
`;

export const CREATE_WAREHOUSE_WITH_MANAGER_MUTATION = gql`
  mutation CreateWarehouseWithManager($args: WarehouseRegistrationArgs) {
    createWarehouseWithManager(args: $args) {
      status
      message
      token
      user {
        id
        email
        role
        password
        Mname
        Lname
        Fname
      }
    }
  }
`;