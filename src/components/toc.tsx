import React from 'react';
import styled from 'styled-components';

const TOCWrapper = styled.div`
    position: sticky;
    top: 50%;
    right: 0rem;
    height: fit-content;
    background-color: white;
    width: 100%;
    padding: 1rem;
    border-left: 1px solid #ebebe8;
    a {
        transition: 0.3s;
    }
    a:hover {
        /* font-weight: bold; */
        color: #1eb49f;        
    }
`;

const TOCTable = styled.div`
    font-size: 0.9rem;
`;

const Container = styled.div`
    position: absolute;
    right: 3rem;
    top: 0;
    width: 15%;
    height: 100%;
    @media only screen and (max-width: 1300px) {
        display: none;
    }
`;

// const Title = styled.h1`
//     font-size: 1.3rem;
//     width: 100%;
//     text-align: center;
//     font-weight: bold;
//     margin-bottom: 2rem;
//     color: #1EB49F;
// `;

type TableOfContentsProps = {
    content: string
}

const TableOfContents:React.FC<TableOfContentsProps> = ( props ) => {
    return (
        <Container>
            <TOCWrapper>
                {/* <Title>
                    Preview
                </Title> */}
                <TOCTable
                    dangerouslySetInnerHTML={{ __html: props.content }}>
                </TOCTable>
            </TOCWrapper>
        </Container>

        
    )
}

export default TableOfContents;