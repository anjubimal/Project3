import gql from 'graphql-tag';


// I re-did the add_user and login_user to get it to work. kept the old code just in case - Chris Winters
// export const LOGIN_USER = gql`
//     mutation login($email: String!, $password: String!) {
//         login(email: $email, password: $password) {
//         token
//             user {
//                 _id
//                 username
//                 email
//                 productCount
//                 savedProducts {
//                     productId
//                     name
//                     vote
//                     overview
//                     image
//                     release
//                 }
//             }
//         }
//     }
// `;

// export const ADD_USER = gql`
//     mutation addUser($firstName: String!, $lastName: String! $email: String!, $password: String!) {
//         addUser(firstname: $firstname, lastname: $lastname, email: $email, password: $password) {
//         token
//             user {
//                 _id
//                 firstName
//                 lastName
//                 email
//                 orders {
//                     _id
//                     purchaseDate
//                     products {
//                         _id
//                         name
//                         description
//                         image
//                         quantity
//                         price
//                         category
//                     }
//                 }
//             }
//         }
//     }
// `;


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
        purchaseDate
        products {
        _id
        name
        description
        price
        quantity
        category {
            name
            } 
        }
    }
}
`;


export const ADD_PRODUCT = gql`
mutation addProduct($name: String!, $description: String!, $image: String!, $quantity: Int!, $price: Float!, $category: String!) {
    addProduct(name: $name, description: $description, image: $image, quantity: $quantity, price: $price, category: $category) {
            _id
            name
            description
            image
            quantity
            price
            category {
                name
        }
    }
}
`;

export const ADD_CATEGORY = gql`
mutation addCategory($name: String!) {
  addCategory(name: $name) {
            _id
            name
            }
}
`;

export const SAVE_PRODUCT = gql`
    mutation saveProduct($input: productInput!) {
        saveProduct(input: $input) {
            _id
            username
            email
            savedProducts {
                productId
                name
                vote
                overview
                image
                release
            }
        }
    }
`;

export const REMOVE_PRODUCT = gql`
    mutation removeProduct($productId: Int!) {
        removeProduct(productId: $productId) {
            _id
            username
            email
            productCount
            savedProducts {
                productId
                name
                vote
                overview
                image
                release
            }
        }
    }
`;

export const DELETE_PRODUCT = gql`
mutation Mutation($deleteProductId: ID!) {
  deleteProduct(_id: $deleteProductId) {
    name
    description
    image
    quantity
    price
    category {
      _id
      name
    }
  }
}
`;