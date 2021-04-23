import React from 'react';
import styled, { css } from 'styled-components';
import { ContentContainer } from './layout.js'
import { Link, graphql, useStaticQuery } from "gatsby"
import typography from '../utils/typography';

const HeaderBackground = styled.div`
    width: 100%;
    height: 24rem;
    position: relative;
    background: url("/images/blackboard.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    font-family: 'Cafe24Oneprettynight';
`;

const Cover = styled.div`
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
`;

const HeaderCover = styled(Cover)`
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    padding: 2rem 0;
`;

const Logo = styled.div`
    font-size: 1.5rem;
    color: white;
`;

const Banner = styled.div`
    font-size: 4rem;
    margin: 0 auto;
    width: 100%;
    text-align: center;
    /* padding: 2.5rem 0 6.5rem; */
    font-weight: 400;
`;

const Category = styled.div`
    color: #eee;
    font-weight: 700;
    font-size: 1.3em;
    transition: 0.3s;
    &:hover {
        color: #1eb49f;
    }
    margin-right: 1rem;
`;

const Categories = styled.div`
    display: flex;
    align-items: flex-end;
`;

const TagsListQuery = graphql`
  query TagListQuery {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tag) {
        fieldValue
        totalCount
      }
    }
  }
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
`

const Header:React.FC = () => {
    const categories = useStaticQuery(TagsListQuery).allMarkdownRemark.group;
    return (
        <HeaderBackground>
            <HeaderCover>
                <ContentContainer>
                    <FlexContainer>
                        <Link to='/'>
                            <Logo>👻 kyunghoon.me </Logo>
                        </Link>
                        <Banner>
                            내가쓰는 개발 아카이브 
                        </Banner>
                        <Categories>
                            {categories.map((category: { fieldValue: string }) => {
                                return (
                                    <Link to={`/${category.fieldValue}`} key={category.fieldValue}>
                                        <Category>
                                            {category.fieldValue} 
                                        </Category>
                                    </Link>
                                )
                            })}
                        </Categories>
                    </FlexContainer>

                </ContentContainer>
            </HeaderCover>
        </HeaderBackground>
      )
}

export default Header;