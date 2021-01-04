import React from 'react'
import styled from 'styled-components';

import Header from "./Header";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Main = styled.main`
    height: 100%;
`

function Layout({ children }) {
    return (
        <Wrapper>
            <Header />
            <Main>{children}</Main>
        </Wrapper>
    )
}

export default Layout
