export interface Frontmatter {
    title: string,
    description: string,
    date: Date,
    tag: string,
}

export interface Post {
    type: string,
    excerpt: string,
    fields: {
        slug: string
    },
    frontmatter: Frontmatter
}