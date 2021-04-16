import React from 'react';
import { Link } from "gatsby"
import { Post } from '../../models/post';

interface PostProps {
    post: Post,
    title: string
}

const Post:React.FC<PostProps> = ({ post, title }) => {
    return (
        <li key={post.fields.slug}>
          <article
            className="post-list-item"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <h2>
                <Link to={post.fields.slug} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </h2>
              <small>{post.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
                itemProp="description"
              />
            </section>
          </article>
        </li>
      )
}

export default Post
