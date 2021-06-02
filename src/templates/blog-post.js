import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import TableOfContents from "../components/toc"
import styled from 'styled-components';

const PostHeadLine = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 2rem 0%;
`;

const PostHeader = styled.h1`
  margin: 1rem 0rem;
  font-weight: 500;  
  font-size: 3rem;
`;

const Tag = styled.div`
  padding: 0.5rem 0.8rem;
  font-size: 0.8rem;
  color: white;
  border-radius: 4px;
  background-color: #1EB49F;
  width: fit-content;
`;

const Headline = styled.blockquote`
  padding: 0 0 0 1.5rem;
  margin: 1.5rem 0;
  font-size: 1.2rem;
  border-left: 0.3rem solid #1EB49F;
  line-height: 1.2;
  color: #222;
`;

const Article = styled.div`
  margin: 3rem 0;
  word-break: break-all;
  li {
    margin-left: 1rem !important;
    list-style: circle;
  }
  ul {
    padding-left: 1rem;
  }
  p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    overflow: hidden;
  }

  h1 {
    color: #1EB49F;
    line-height: 1.5;
    margin-bottom: 3rem;
    font-size: 2rem;
  }

  blockquote {
    padding: 0 0 0 1.5rem;
    margin: 1.5rem 0;
    font-size: 1rem;
    border-left: 0.3rem solid #666;
    line-height: 1.2;
    color: #666;
  }

  h2, h3 {
    line-height: 1.5;
    margin-bottom: 1.5rem;
    font-weight: bold;
  }

  pre, code {
    margin: 1rem 0rem;
  }

  code {
    color: #1EB49F;
    font-family: 'RIDIBatang' !important;
  }

  pre code {
    font-family: Consolas, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, monospace;
    color: #363738;
  }

  a {
    color: #1B60FF;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  a:hover:after {
    width: 100%;
  }

  a:after {
    content: "";
    position: absolute;
    width: 0;
    height: 1.5px;
    background-color: #1B60FF;
    left: 0;
    bottom: 0;
    transition: 0.3s;
  }

  .gatsby-resp-image-link:after {
    display: none;
  }


  em {
    font-weight: bold;
    color: #1EB49F;
  }

  hr {
    margin: 2.5rem 0;
  }
`;

const ImageContainer = styled.div`
  .gatsby-image-wrapper {
    width: 70%;
    margin: 0 auto;
  }
  @media only screen and (max-width: 48rem) {
    .gatsby-image-wrapper {
      width: 100%;
    }
  }
`;

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const TOC = post.tableOfContents;
  const siteTitle = data.site.siteMetadata?.title || `Title`
  let thumbnailImgFluid = post.frontmatter.thumbnail?.childImageSharp.fluid
  const { previous, next } = data

  return (
    <>
      <TableOfContents content={ TOC } />
      <Layout location={location} title={siteTitle} maxWidth="48rem">
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <PostHeadLine>
            <ImageContainer>
              { thumbnailImgFluid ? <Img fluid={thumbnailImgFluid}/> : <></>}
            </ImageContainer>
            <PostHeader itemProp="headline">{post.frontmatter.title}</PostHeader>
            <p>{post.frontmatter.date}</p>
            <Link to={`/${post.frontmatter.tag}`}>
              <Tag>#{post.frontmatter.tag}</Tag>
            </Link>
          </PostHeadLine>
          <Headline>{post.frontmatter.description}</Headline>
          <Article
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          {/* <hr /> */}
          <footer>
            {/* <Bio /> */}
          </footer>
        </article>
        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    </>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        tag
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
