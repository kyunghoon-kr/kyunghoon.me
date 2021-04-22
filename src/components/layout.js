import React from "react"
import styled from "styled-components"
import Header from "./header";
import { GlobalStyle } from "../styles/global-style"

export const ContentContainer = styled.div`
  max-width: 54rem;
  max-width: ${(props) => props.maxWidth || '54rem' };
  margin: 0 auto;
  height: 100%;
`;

const Footer = styled.footer`
  padding: 0.2rem;
  background-color: #ebebe8;
  text-align: center;
  line-height: 1.5;
`;

const Layout = ({ location, title, children, maxWidth }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  return (
    <>
      <GlobalStyle />
      <Header></Header>
      <ContentContainer maxWidth= {maxWidth}>
        <main>{children}</main>
      </ContentContainer>
      <Footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        , Published by Kyunghoon
      </Footer>
    </>
  )
}

export default Layout
