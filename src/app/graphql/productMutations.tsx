import { gql } from "@apollo/client";

const CREATE_PRODUCT_MUTATION=gql`
mutation CreateProduct($args: ProductArgs) {
  createProduct(args: $args) {
    status
    message
  }
}
`
export default CREATE_PRODUCT_MUTATION