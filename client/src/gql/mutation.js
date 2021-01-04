import { gql } from "@apollo/client";

const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            author {
                username
            }
        }
    }
`;

const SIGNUP = gql`
    mutation signUp($username: String!, $email: String!, $password: String!) {
        signUp(username: $username, email: $email, password: $password)
    }
`;

const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

const LOGOUT = gql`
    mutation logout($email: String!) {
        logout(email: $email)
    }
`;

export { NEW_NOTE, SIGNUP, LOGIN, LOGOUT };