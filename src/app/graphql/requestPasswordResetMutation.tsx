import { gql } from "@apollo/client";

const REQUEST_RESET_PASSWORD_MUTATION=gql`
mutation RequestPasswordReset($args: PasswordResetArgs) {
  requestPasswordReset(args: $args) {
    status
    message
  }
}
`
export default REQUEST_RESET_PASSWORD_MUTATION