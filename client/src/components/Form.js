import React, { useState } from 'react'
import { useMutation } from "@apollo/client";
import styled from "styled-components";

import { GET_NOTES } from "../gql/query";
import { NEW_NOTE } from "../gql/mutation";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    position: sticky;
    bottom: 0;
    background-color: white;
    padding: 20px 0;
`

function Form() {
    const [note, setNote] = useState("");
    const [createNote] = useMutation(NEW_NOTE, {
        refetchQueries: [{ query: GET_NOTES }],
        awaitRefetchQueries: true,
    });

    const sendNote = (e) => {
        e.preventDefault();
        if (note !== "") {
            createNote({
                variables: {
                    content: note
                },
            });
        }
    }
    return (
        <Wrapper>
            <form>
                <label>Create a note: </label>
                <input type="text" onChange={(e) => {
                    e.preventDefault();
                    setNote(e.target.value);
                }} />
                <button onClick={sendNote}>Send</button>
            </form>
        </Wrapper>
    )
}

export default Form
