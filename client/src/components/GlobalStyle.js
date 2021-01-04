import { createGlobalStyle } from "styled-components";
import normalize from "normalize.css";

export default createGlobalStyle`
    ${normalize}
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,400;0,700;1,400&display=swap');

    *, *:before, *:after {
        box-sizing: border.box;
    }

    body,
    html {
        height: 100%;
        margin: 0;
    }

    body {
        background-color: #fff;
        font-family: 'Roboto Condensed', sans-serif;
    }
`