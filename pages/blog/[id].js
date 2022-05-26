import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";

import Head from "next/head";
import ReactMarkdown from "react-markdown";
import Background from "../../public/blogPostBackground.jpg";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import { blogPosts } from "../../blog";

import { readMarkdownFile } from "../../utils/readMarkdown";
import Layout from "../../components/layout/layout";

import { useRouter } from "next/router";

function flatten(text, child) {
    return typeof child === "string"
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props) {
    var children = React.Children.toArray(props.children);
    var text = children.reduce(flatten, "");
    var slug = text.toLowerCase().replace(/\W/g, "-");
    return React.createElement("h" + props.level, { id: slug }, props.children);
}

const BlogPost = ({ file, info }) => {
    const router = useRouter();

    useEffect(() => {
        if (document.querySelectorAll('a[href^="#"]')) {
            const documents = document.querySelectorAll('a[href^="#"]');

            [].forEach.call(documents, function (el) {
                el.addEventListener("click", (e) => {
                    e.preventDefault();
                    document
                        .querySelector(e.currentTarget.getAttribute("href"))
                        .scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        });
                });
            });
        }
        return () => {
            [].forEach.call(documents, function (el) {
                el.removeEventListener("click", (e) => {
                    e.preventDefault();
                    document
                        .querySelector(e.currentTarget.getAttribute("href"))
                        .scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        });
                });
            });
        };
    }, []);

    return (
        <Layout>
            <Head>
                <title>{info.title} - erolyagizaydin</title>
            </Head>
            <Grid
                container
                className="backgroundContainer"
                style={{
                    backgroundImage: `url(${Background.src})`,
                    backgroundSize: "cover",
                }}
            >
                <Grid item xs={12} sm={6} className="infoGrid">
                    <KeyboardReturnIcon onClick={() => router.push("/blog")} />
                    <Typography variant="h4">{info.title}</Typography>
                    <Typography variant="subtitle2">
                        {info.createDate}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container className="markdownGrid">
                <ReactMarkdown
                    components={{
                        h2: HeadingRenderer,
                        h3: HeadingRenderer,
                        h4: HeadingRenderer,
                    }}
                >
                    {file}
                </ReactMarkdown>
            </Grid>
            <Grid container className="pageFooter">
                <p>
                    I hope that this article will help you on your journey. You
                    can go back to{" "}
                    <strong onClick={() => router.push("/blog")}>
                        blog page
                    </strong>{" "}
                    or{" "}
                    <strong onClick={() => router.push("/")}>homepage</strong>.
                </p>
            </Grid>
        </Layout>
    );
};

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
    const fileInfo = blogPosts.filter((el) => el.key == id)[0];

    const file = await readMarkdownFile(fileInfo.name);

    return {
        props: { file, info: fileInfo },
    };
}

export default BlogPost;
