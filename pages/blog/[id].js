import { Grid } from "@mui/material";
import styles from "../../styles/BlogPost.module.scss";

import path from "path";

import { blogPosts } from "../../blog";

import { readMarkdownFile } from "../../utils/readMarkdown";

const BlogPost = ({ file }) => {
    console.log(file);
    return <Grid container>asd</Grid>;
};

export default BlogPost;

export async function getStaticPaths() {
    return {
        paths: blogPosts.map((el) => ({
            params: {
                id: el.key,
            },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const id = params.id;
    const fileName = blogPosts.filter((el) => el.key == id)[0].name;

    const file = await readMarkdownFile(fileName);

    return {
        props: { file },
    };
}
