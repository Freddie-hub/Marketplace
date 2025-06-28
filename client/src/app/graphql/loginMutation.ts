import { gql } from "@apollo/client";

const LOGIN_MUTATION=gql`
mutation Login($args: LoginArgs) {
  Login(args: $args) {
    status
    message
    token
  }
}
`
export default LOGIN_MUTATION