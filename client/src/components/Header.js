import React, { useState } from 'react'
import styled from 'styled-components';
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { LOGIN, LOGOUT } from "../gql/mutation";
import { ME } from "../gql/query";

const HeaderComponent = styled.header`
    background-color: #eee;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    position: sticky;
    top: 0;
    z-index: 2;
    -webkit-box-shadow: 0px 3px 12px 0px rgba(0,0,0,0.6); 
    box-shadow: 0px 3px 12px 0px rgba(0,0,0,0.6);
`;

const LoginForm = styled.div`
    margin: 0 30px 0 0;
`

function Header() {
    const [values, setValues] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLogged, setIsLogged] = useState();
    const { client, data: meData, loading: meLoading, error: meError } = useQuery(ME);
    const [login] = useMutation(LOGIN, {
        variables: {
            ...values
        },
        refetchQueries: [{ query: ME }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            setErrorMessage("");
        },
        onError: (error) => {
            setErrorMessage(error.message);
        }
    });
    //const [login] = useLoginMutation();
    const [logout] = useMutation(LOGOUT, {
        refetchQueries: [{ query: ME }],
        awaitRefetchQueries: true,
        onError: () => {
            window.location.reload();
        }
    });
    //const [authToken] = useAuthToken();
    //const userData = useUserQuery();

    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    };

    const buttonLogin = (e) => {
        login(values);
    }

    const buttonLogout = (e) => {
        logout({
            variables: {
                email: meData.me.email
            }
        });
    }
    //console.log("userData: ", userData.data);
    //console.log("authToken: ", authToken);
    return (
        <HeaderComponent>
            <LoginForm>
                {meData ? (<>
                    <span>You are logged in as {meData.me.username}</span>{"  "}
                    <button onClick={buttonLogout}>Logout</button>
                </>) : (<>
                    <div>
                        <input type="text" name="email" placeholder="Email" onChange={onChange} />
                        <input type="password" name="password" placeholder="Password" onChange={onChange} />
                        <button onClick={buttonLogin}>Login</button>
                    </div>
                    <div>
                        <Link to="/register">Create an account</Link>
                        {"   "}
                        <label style={{ color: "red" }}>{errorMessage}</label>
                    </div>
                </>)}
            </LoginForm>
        </HeaderComponent>
    )
}

export default Header
