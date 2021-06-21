import React from 'react';
import { Link } from "gatsby"
import { PostModel } from '../../models/post';
import styled from 'styled-components';
import Img from "gatsby-image";

interface PostProps {
    post: PostModel,
    title: string
}

const PostCard = styled.div`
    width: 30.3333%;
    margin: 0 1.5%;
    position: relative;
    border: 1px solid #ebebe8;
    margin-bottom: 2rem;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
    .gatsby-image-wrapper {
      transition: transform 0.3s;
      overflow: hidden;
    }

    &:hover .gatsby-image-wrapper {
      transform: scale(1.1);
    }

    @media only screen and (max-width: 48rem) {
      width: 47%;
    }
`;

const PostImgBackground = styled.div`
    height: 10rem;
    background-color: #444;
`;

const PostDescription = styled.div`
    margin: 4rem 1rem 3rem;
    h2 {
      font-weight: bold;
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }
    small {
      font-size: 0.9rem;
      line-height: 1.5;
    }
    p {
      font-size: 0.94rem;
      text-overflow: ellipsis;
      white-space: pre-line;
      overflow: hidden;
      overflow-y: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: -webkit-box;
    }
`;

const PostImgWrapper = styled.div`
    position: absolute;
    top: 2rem;
    left: 10%;
    width: 80%;
    height: 10rem;

    .gatsby-image-wrapper {
      height: 100%;
    }
`;

const Post:React.FC<PostProps> = ({ post, title }) => {
    let thumbnailImgFluid = post.frontmatter.thumbnail?.childImageSharp.fluid
    return (
      <PostCard
          itemScope
          itemType="http://schema.org/Article"
        >
        <Link to={post.fields.slug} itemProp="url">
        <header>
          <PostImgBackground/>
            { thumbnailImgFluid && 
            <PostImgWrapper>
              <Img fluid={thumbnailImgFluid}/>
            </PostImgWrapper>
            }
        </header>
          
          <PostDescription>
            <h2>
              <span itemProp="headline">{title}</span>
            </h2>
            <small>{post.frontmatter.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: post.frontmatter.description || post.excerpt,
              }}
              itemProp="description"
            />
          </PostDescription>
        </Link>
      </PostCard>
      )
}

export default Post
