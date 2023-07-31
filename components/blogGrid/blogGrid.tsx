import { Grid, Typography, Button } from "@mui/material";
import blogPosts from "../../blog";
import BlogCard from "../blogCard/blogCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const BlogGrid: React.FC = () => {
    const [domLoaded, setDomLoaded] = useState(false);

    const router = useRouter();
    const navigate = (path: string): Promise<boolean> => router.push(path);

    useEffect(() => {
        setDomLoaded(true);
    }, []);
    return (
        <Grid container id="contactGrid" className="projectsContainer">
            <Grid
                item
                xs={12}
                className="contactGrid__titleGrid"
                style={{ marginBottom: "4rem" }}
            >
                <Typography
                    variant="h4"
                    color="primary"
                    style={{ margin: "4rem 0 2rem 0" }}
                >
                    Recent Blog Posts
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat( auto-fit, minmax(150px, 1fr) )",
                    alignItems: "center",
                }}
            >
                {domLoaded &&
                    blogPosts
                        .slice(0, 3)
                        .map((el) => (
                            <BlogCard
                                key={el.key}
                                title={el.title}
                                img={`logo/${el.logoName}.svg`}
                                tag={el.topic}
                                id={el.key}
                            />
                        ))}
            </Grid>

            <Button
                style={{ margin: "4rem 0 2rem 0" }}
                onClick={() => navigate("/blog")}
                variant="contained"
                color="primary"
            >
                Click for all blog posts
            </Button>
        </Grid>
    );
};

export default BlogGrid;
