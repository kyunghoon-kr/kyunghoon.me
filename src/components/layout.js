import React from "react"
import styled from "styled-components"
import Header from "./header";
import { GlobalStyle } from "../styles/global-style"

export const ContentContainer = styled.div`
  max-width: 60rem;
  margin: 0 auto;
`;

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  return (
    <>
      <GlobalStyle />
      <Header></Header>
      <ContentContainer>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </ContentContainer>
    </>
  )
}

export default Layout
