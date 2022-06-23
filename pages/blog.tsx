import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import Layout from "../components/layout/layout";

import Background from "../public/webP/blogBackground.webp";
import { Typography, Grid, Button } from "@mui/material";

import { blogTechnologies } from "../constants/blogTechnologies";
import { blogPosts } from "../blog";
import { useRouter } from "next/router";

const Home: React.FC = () => {
    const [topic, setTopic] = useState<string>("");
    const router = useRouter();
    const gridStyle = {
        backgroundImage: `linear-gradient(180deg, rgba(3,1,22,0.7287289915966386) 0%, rgba(61,61,113,0.7371323529411764) 17%, rgba(255,255,255,1) 100%), url(${Background.src})`,
        backgroundSize: "cover",
    };

    const filteredPosts = () => {
        if (topic != "") {
            return blogPosts.filter((el) => el.topic === topic);
        }
        return blogPosts;
    };

    return (
        <div className="blog__container">
            <Layout>
                <Head>
                    <title>Blog - erolyagizaydin</title>
                    <meta
                        name="description"
                        content="Blog page of Erol Yağız Aydın"
                    />
                    <link rel="icon" href="/favicon/favicon.ico" />
                </Head>

                <main className="blog__main" style={gridStyle}>
                    <Typography className="blog__title" variant="h3">
                        Blog
                    </Typography>
                    <Typography className="blog__subtitle" variant="h5">
                        You can find my blog posts here. I like writing while
                        learning new stuff!
                    </Typography>
                    <Grid container className="blog__blogContainer">
                        <Grid item xs={12} md={4} className="blog__grid">
                            <Typography
                                variant="h6"
                                className="blog__blogTitle"
                            >
                                Topics
                            </Typography>
                            {blogTechnologies.map((el) => (
                                <Grid
                                    item
                                    xs={12}
                                    className="blog__logoGrid"
                                    key={el.key}
                                    onClick={() => setTopic(el.key)}
                                >
                                    <Image
                                        src={
                                            require(`../public/logo/${el.logo}.svg`)
                                                .default
                                        }
                                        alt={`${el.logo}`}
                                        height={40}
                                        width={40}
                                        className="blog__logoImage"
                                    />
                                    <Typography
                                        variant="h6"
                                        className="blog__logoText"
                                    >
                                        {el.name}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={12} md={7} className="blog__grid">
                            <Typography
                                variant="h6"
                                className="blog__blogTitle"
                            >
                                Posts
                            </Typography>
                            {filteredPosts().map(
                                ({ title, logoName, createDate, key }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        key={title}
                                        className="blog__logoGrid"
                                        onClick={() =>
                                            router.push(`/blog/${key}`)
                                        }
                                    >
                                        <Image
                                            src={
                                                require(`../public/logo/${logoName}.svg`)
                                                    .default
                                            }
                                            alt={`${logoName}`}
                                            height={40}
                                            width={40}
                                            style={{ flex: 1 }}
                                        />
                                        <Typography
                                            variant="h6"
                                            className="blog__logoText"
                                            style={{ flex: 2 }}
                                        >
                                            {title}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            className="blog__logoText"
                                            style={{
                                                flex: 1,
                                                justifyContent: "end",
                                            }}
                                        >
                                            {createDate}
                                        </Typography>
                                    </Grid>
                                )
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className="blog__buttonGrid">
                        <Button
                            variant="outlined"
                            onClick={() => router.push("/")}
                        >
                            Back to Home
                        </Button>
                    </Grid>
                </main>
            </Layout>
        </div>
    );
};

export default Home;
