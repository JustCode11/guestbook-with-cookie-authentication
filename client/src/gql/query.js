import { gql } from "@apollo/client";

const GET_NOTES = gql`
    query notes {
        notes {
            id
            content
            author {
                username
            }
        }
    }
`;

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const ME = gql`
    query Me {
        me {
            username
            email
        }
    }
`

export { GET_NOTES, IS_LOGGED_IN, ME };