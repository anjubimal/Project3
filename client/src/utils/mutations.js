import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
            user {
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
    }
`;

export const ADD_USER = gql`
    mutation addUser($firstName: String!, $lastName: String! $email: String!, $password: String!) {
        addUser(firstname: $firstname, lastname: $lastname, email: $email, password: $password) {
        token
            user {
                _id
                firstName
                lastName
                email
                orders {
                    _id
                    purchaseDate
                    products {
                        _id
                        name
                        description
                        image
                        quantity
                        price
                        category
                    }
                }

            }
        }
    }
`;

// export const ADD_ORDER = gql`
//     mutation addOrder($input: productInput!) {
//         addOrder(input: $input) {

//         }
// `;


export const ADD_PRODUCT = gql`
    mutation addProduct($input: productInput!) {
        addProduct(input: $input) {
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