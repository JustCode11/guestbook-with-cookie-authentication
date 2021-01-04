import React from 'react'
import { useQuery } from "@apollo/client";
import { GET_NOTES } from "../gql/query";
import styled from "styled-components";

import Note from "../components/Note";
import Form from "../components/Form";

const HomeContainer = styled.div`
    width: 60%;
    margin: 0 auto;
    position: relative;
`

const Title = styled.h2`
    text-align: center;
    font-size: 2.5em;
`

function Home() {
    const { data, loading, error } = useQuery(GET_NOTES);
    console.log(data);

    if (loading) return <p>Loading notes...</p>;
    if (error) return <p>Error!</p>;

    return (
        <HomeContainer>
            <Title>Guestbook</Title>
            {data.notes.map((note) => {
                return (
                    <Note key={note.id} note={note} />
                )
            })}
            <Form />
        </HomeContainer>
    )
}

export default Home;
