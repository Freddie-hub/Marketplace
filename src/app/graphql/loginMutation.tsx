import { gql } from "@apollo/client";

const LOGIN_MUTATION=gql`
mutation Login($args: LoginArgs) {
  Login(args: $args) {
    status
    message
    token
    user {
      id
      Fname
      Mname
      Lname
      photo
      email
      role
      password
      warehouse {
        id
        capacity
        email
        address
        location
        managerId
        name
        phone
      }
    }
  }
}
`
export default LOGIN_MUTATION