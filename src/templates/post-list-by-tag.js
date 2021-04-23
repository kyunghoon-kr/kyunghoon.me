import React from "react"
// import { Link } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import Post from "../components/post/post"
// import styled  from 'styled-components';
import PostList from './post-list'

const PostListByTag = ({ data, location, search, pageContext }) => {
    const { tag } = pageContext
    const posts = data.allMarkdownRemark.nodes
  
    return (
      <Layout location={location} title={tag}>
        <SEO title="Posts" />
        {/* <Bio /> */}
        <PostList posts={posts.filter(post => post.frontmatter.tag === tag)} />
      </Layout>
    )
  }
  
export default PostListByTag;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
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
    }
  }
`



