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

const Article = styled.div`
  margin: 3rem 0;
  h1 {
    color: #1EB49F;
    line-height: 1.5;
  }

  h2, h3 {
    line-height: 1.5;
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
`;

const ImageContainer = styled.div`
  .gatsby-image-wrapper {
    width: 70%;
    margin: 0 auto;
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
