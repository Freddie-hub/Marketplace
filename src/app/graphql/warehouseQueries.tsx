import { gql } from '@apollo/client';

export const GET_WAREHOUSES_QUERY = gql`
  query GetAllWarehouses {
    allWarehouses {
      status
      message
      warehouses {
        id
        name
        location
        address
        capacity
        phone
        email
        manager {
          id
          Fname
          Lname
          email
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_WAREHOUSE_BY_ID_QUERY = gql`
  query GetWarehouseById($id: Int!) {
    warehouseById(id: $id) {
      status
      message
      warehouse {
        id
        name
        location
        address
        capacity
        phone
        email
        manager {
          id
          Fname
          Lname
          email
        }
        farmers {
          id
          Fname
          Lname
          email
          phone
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_USER_WAREHOUSE_QUERY = gql`
  query GetUserWarehouse($userId: Int!) {
    userWarehouse(userId: $userId) {
      status
      message
      warehouse {
        id
        name
        location
        address
        capacity
        phone
        email
        manager {
          id
          Fname
          Lname
          email
        }
      }
    }
  }
`;