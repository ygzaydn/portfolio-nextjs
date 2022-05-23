import React, { useEffect, useRef } from "react";
import { Grid, Typography } from "@mui/material";
import styles from "../../styles/LandingImage.module.css";
import Typed from "typed.js";
import BackgroundImage from "../../images/background6.jpg";

const LandingImage = () => {
    const el = useRef("");

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["erolyagizaydin"],
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 1000,
            showCursor: false,
            loop: true,
        });

        // Destroying
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <Grid
            container
            className={styles.homepageContainer}
            id="home"
            style={{ backgroundImage: `url(${BackgroundImage.src})` }}
        >
            <Grid
                item
                xs={12}
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    //marginTop: limit > width ? "0" : "5rem",
                    paddingLeft: "10%",
                    maxWidth: "1920px",
                    marginRight: "auto",
                    marginLeft: "auto",
                }}
            >
                <Typography
                    variant="h4"
                    style={{ color: "white", textAlign: "start" }}
                >
                    Hello I&apos;m
                </Typography>
                <Typography
                    variant="h3"
                    style={{
                        textAlign: "end",
                        color: "rgb(75, 202, 135)",
                        fontWeight: "600",
                        minHeight: "3.5rem",
                    }}
                    ref={el}
                />
                <Typography
                    variant="h4"
                    style={{ color: "white", textAlign: "end" }}
                >
                    a web developer
                </Typography>
                <button className={styles.button}>Check out my blog!</button>
            </Grid>
        </Grid>
    );
};

export default LandingImage;
