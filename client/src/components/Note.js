import React from 'react'
import styled from "styled-components";

const Wrapper = styled.article`
    display: flex;
    flex-direction: column;
    max-height: 400px;
    overflow-y: scroll;
    border: 1px solid #eee;
    margin: 10px;
    padding: 15px;
`

const AuthorContainer = styled.div`
    text-align: right;
`

const User = styled.span`
    font-style: italic;
    color: green;
`

function Note({ note }) {
    return (
        <Wrapper>
            <div>{note.content}</div>
            <AuthorContainer>posted by <User>{note.author.username}</User></AuthorContainer>
        </Wrapper>
    )
}

export default Note
