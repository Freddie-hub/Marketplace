import { gql } from "@apollo/client";

const CONFIRM_EMAIL_MUTATION=gql`
mutation ConfirmEmail($token: String!) {
  confirmEmail(token: $token) {
    status
    message
  }
}
`
export default CONFIRM_EMAIL_MUTATION