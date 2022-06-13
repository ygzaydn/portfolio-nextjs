import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";

import { useRouter } from "next/router";

const Header: React.FC = () => {
    const router = useRouter();
    const { asPath } = useRouter();

    const scrollTo = (element: string): void => {
        if (asPath !== "/") {
            router.push({ pathname: "/", query: { element } }, "/");
        } else {
            document.getElementById(`${element}`).scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    useEffect(() => {
        const scrollFunc = (): void => {
            let y = window.pageYOffset;
            let header = document.getElementById("header");
            if (header) {
                if (y) {
                    header.style.backgroundColor = "black";
                    header.style.borderBottom = "0.2px solid lightgray";
                    header.style.zIndex = "500";
                    header.style.padding = "0";
                    header.style.visibility = "visible";
                } else {
                    header.style.backgroundColor = "inherit";
                    header.style.borderBottom = "none";
                    header.style.padding = "2%";
                }
            }
        };

        scrollFunc();

        window.addEventListener("scroll", () => scrollFunc());
        return (): void =>
            window.removeEventListener("scroll", () => scrollFunc());
    }, []);

    const navigate = (path: string): Promise<boolean> => router.push(path);

    return (
        <header>
            <Grid container className="headerContainer" id="header">
                <Grid container className="headerMaxWidthGrid">
                    <Grid
                        item
                        xs={12}
                        sm={4}
                        className="headerContainer__nameGrid"
                        onClick={() => scrollTo("home")}
                    >
                        <Typography
                            className="headerContainer__nameGrid__name"
                            style={{ transition: "all .4s" }}
                        >
                            erolyagiz
                        </Typography>
                        <Typography
                            className="headerContainer__nameGrid__name"
                            style={{
                                transition: "all .4s",
                                color: "rgb(75, 202, 135)",
                            }}
                        >
                            aydin
                        </Typography>
                    </Grid>

                    <Grid item xs={5} className="headerContainer__menuGrid">
                        <Typography
                            key="home-desktop"
                            id="header-home"
                            onClick={() => scrollTo("home")}
                        >
                            Home
                        </Typography>
                        <Typography
                            key="services-desktop"
                            id="header-services"
                            onClick={() => scrollTo("servicesGrid")}
                        >
                            Services
                        </Typography>
                        <Typography
                            key="stack-desktop"
                            id="header-stack"
                            onClick={() => scrollTo("techStack")}
                        >
                            Tech
                        </Typography>
                        <Typography
                            key="project-desktop"
                            id="header-projects"
                            onClick={() => scrollTo("projectsGrid")}
                        >
                            Projects
                        </Typography>
                        <Typography
                            key="contact-desktop"
                            id="header-contacts"
                            onClick={() => scrollTo("contactGrid")}
                        >
                            Contact
                        </Typography>
                        <Typography
                            key="blog"
                            id="header-blog"
                            onClick={() => navigate("/blog")}
                        >
                            Blog
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </header>
    );
};

export default Header;
