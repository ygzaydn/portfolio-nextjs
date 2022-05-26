import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();
    const { asPath } = useRouter();

    const scrollTo = (element) => {
        if (asPath === "/") {
            document.getElementById(`${element}`).scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else {
            router.push("/");
        }
    };

    useEffect(() => {
        const scrollFunc = () => {
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
        return () => window.removeEventListener("scroll", () => scrollFunc());
    }, []);

    const navigate = (path) => router.push(path);

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
                        <Typography color="error">aydin</Typography>
                    </Grid>

                    <Grid item xs={5} className="headerContainer__menuGrid">
                        <Typography key="home-desktop" id="header-home">
                            Home
                        </Typography>
                        <Typography key="services-desktop" id="header-services">
                            Services
                        </Typography>
                        <Typography key="stack-desktop" id="header-stack">
                            Tech
                        </Typography>
                        <Typography key="project-desktop" id="header-projects">
                            Projects
                        </Typography>
                        <Typography key="contact-desktop" id="header-contacts">
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
