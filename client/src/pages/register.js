import React, { useState } from 'react'
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { SIGNUP } from "../gql/mutation";
import { ME } from "../gql/query";

const RegisterComponent = styled.div`
    width: 60%;
    margin: 0 auto;
    position: relative;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormItem = styled.div`
    margin: 5px 0;
`;

const Label = styled.label`
    display: block;
    font-size: .9em;
    color: grey;
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
`;

const Button = styled.button`
    margin: 0 5px;
`;

function Register() {
    let history = useHistory();
    const [values, setValues] = useState();
    const [signup] = useMutation(SIGNUP, {
        variables: {
            ...values
        },
        refetchQueries: [{ query: ME }],
        awaitRefetchQueries: true,
        onCompleted: () => {
            console.log("push");
            history.push("/");
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    };

    const buttonSave = (e) => {
        signup(values);
    }
    return (
        <RegisterComponent>
            <Form>
                <h2>Register new user</h2>
                <FormItem>
                    <Label>Username</Label>
                    <input type="text" name="username" onChange={onChange} />
                </FormItem>
                <FormItem>
                    <Label>Email</Label>
                    <input type="text" name="email" onChange={onChange} />
                </FormItem>
                <FormItem>
                    <Label>Password</Label>
                    <input type="password" name="password" onChange={onChange} />
                </FormItem>
                <ButtonContainer>
                    <Button type="submit" onClick={buttonSave}>Save</Button>
                    <Link to="/" style={{ cursor: "default", color: "black", textDecoration: "none" }}><Button>Back</Button></Link>
                </ButtonContainer>
            </Form>
        </RegisterComponent >
    )
}

export default Register
