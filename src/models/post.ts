export interface Frontmatter {
    title: string,
    description: string,
    date: Date,
    tag: string,
    thumbnail: any
}

export interface PostModel {
    type: string,
    excerpt: string,
    fields: {
        slug: string
    },
    frontmatter: Frontmatter
}