const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
    admin: Boolean
  }
  type Checkout {
    session: ID
  }
  type Auth {
    token: ID
    user: User
  }
  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    addProduct(name: String!, description: String!, image: String!, quantity: Int!, price: Float!, category: String!): Product
    addCategory(name: String!): Category
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(quantity: Int!): Product
    removeProduct(_id: ID!,): Product
    deleteProduct(_id: ID!,): Product
  }
`;

module.exports = typeDefs;