import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --moderate-blue: hsl(238, 40%, 52%);
    --soft-red: hsl(358, 79%, 66%);
    --light-grayish-blue: hsl(239, 57%, 85%);
    --pale-red: hsl(357, 100%, 86%);
    --dark-blue: hsl(212, 24%, 26%);
    --grayish-blue: hsl(211, 10%, 45%);
    --light-gray: hsl(223, 19%, 93%);
    --very-light-gray: hsl(228, 33%, 97%);
    --white: hsl(0, 0%, 100%);

    font-family: 'Rubik', sans-serif;
    background: var(--very-light-gray);
  }

  * {
  font-family: 'Rubik', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #root {
    display: grid;
    place-content: center;
    padding: 1rem;
  }
`;
export default GlobalStyles;
