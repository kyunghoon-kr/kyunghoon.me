import React from 'react';
import { Link } from "gatsby"
import { PostModel } from '../models/post';
import styled from 'styled-components';
import Post from '../components/post/post';

interface PostListProps {
    posts: PostModel[]
}

const PostListWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 4.2rem 0;
`;

const PostList:React.FC<PostListProps> = ({ posts }) => {
    return (
        <PostListWrapper>
            {posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug
                return (
                <Post key={post.fields.slug} post={post} title={title} />
                )
            })}
        </PostListWrapper>
    )
}

export default PostList;
