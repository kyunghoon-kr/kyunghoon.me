import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post/post"
import PostList from "../templates/post-list"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          포스트가 비었네요 
          <span role="img" aria-label="no-post">🥺</span>
        </p>
      </Layout>
    )
  }

  return (
    <>
      <Layout location={location} title={siteTitle}>
        <SEO title="Main" description="반갑습니다, June의 개발 아카이브입니다."/>
        {/* <Bio /> */}
        <PostList posts={posts} />

      </Layout>
      </>
  )
}

export default BlogIndex

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
