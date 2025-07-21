import { gql } from "@apollo/client";

const RESET_PASSWORD_MUTATION=gql`
mutation ResetPassword($args: ResetPasswordArgs) {
  resetPassword(args: $args) {
    status
    message
  }
}
`
export default RESET_PASSWORD_MUTATION