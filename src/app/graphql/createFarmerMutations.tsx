import { gql } from '@apollo/client';
export const CREATE_USER_MUTATION = gql`
mutation CreateFarmer($args: FarmerArgs) {
  createFarmer(args: $args) {
    status
    message
  }
}
`;