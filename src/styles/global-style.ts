import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    h1 {
        font-size: 2.5rem;
    }
    h2 {
        font-size: 2rem;
    }
    h3 {
        font-size: 1.5rem;
    }
    p {
        line-height: 1.5;
    }

    @media only screen and (max-width: 48rem) {
        h1 {
            font-size: 2.2rem;
        }
        h2 {
            font-size: 1.5rem;
        }

        h3 {
            font-size: 1.3rem;
        }
    }
    
`;