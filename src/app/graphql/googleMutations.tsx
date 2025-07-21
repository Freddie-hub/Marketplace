import { gql } from '@apollo/client';

export const GOOGLE_SIGNUP_MUTATION = gql`
  mutation GoogleSignup($args: GoogleSignupInput!) {
    GoogleSignup(args: $args) {
      status
      message
      token
      user {
        id
        email
        Fname
        Lname
        role
        photo
        warehouse {
          id
          name
          location
          address
          capacity
          phone
          email
        }
      }
    }
  }
`;