import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";

import Head from "next/head";
import ReactMarkdown from "react-markdown";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import blogPosts from "../../blog";

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

interface infoObject {
    title: string;
    createDate: string;
}

interface BlogPostProps {
    file: string;
    info: infoObject;
}

const BlogPost: React.FC<BlogPostProps> = ({ file, info }) => {
    const router = useRouter();

    useEffect(() => {
        let documents;
        if (document.querySelectorAll('a[href^="#"]')) {
            documents = document.querySelectorAll('a[href^="#"]');

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
                <meta
                    name="description"
                    content={`${info.title} erolyagizaydin`}
                />
                <link rel="icon" href="/favicon/favicon.ico" />
            </Head>
            <div
                className="flex w-full relative bg-no-repeat bg-center"
                style={{ height: "70vh" }}
            >
                <img
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    srcSet="
                            /webP/blogPostBackground_z0aa3y_c_scale,w_300.webp 300w,
                            /webP/blogPostBackground_z0aa3y_c_scale,w_845.webp 845w,
                            /webP/blogPostBackground_z0aa3y_c_scale,w_1200.webp 1200w
                        "
                    src="/webP/blogPostBackground_z0aa3y_c_scale,w_1200.webp"
                    alt="blogpostbackground-bg"
                    className="absolute inset-0 -z-5 h-full w-full object-cover"
                />

                <div className="absolute bottom-0 left-0 min-w-1/2 bg-gray-400/60 flex flex-col px-4 py-2 max-w-full">
                    <KeyboardReturnIcon
                        className="text-slate-100 mt-2 text-4xl cursor-pointer"
                        onClick={() => router.push("/blog")}
                    />
                    <h4 className="my-2 text-slate-200 text-3xl mb-2 w-full line-bre">
                        {info.title}
                    </h4>
                    <p className="text-left text-slate-300 text-lg">
                        {info.createDate}
                    </p>
                </div>
            </div>
            <div className="markdownGrid prose-lg sm:prose-sm">
                <ReactMarkdown
                    components={{
                        h1: HeadingRenderer,
                        h2: HeadingRenderer,
                        h3: HeadingRenderer,
                        h4: HeadingRenderer,
                    }}
                >
                    {file}
                </ReactMarkdown>
            </div>
            <div className="pageFooter">
                <p>
                    I hope that this article will help you on your journey. You
                    can go back to{" "}
                    <strong onClick={() => router.push("/blog")}>
                        blog page
                    </strong>{" "}
                    or{" "}
                    <strong onClick={() => router.push("/")}>homepage</strong>.
                </p>
            </div>
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
