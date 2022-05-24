import { useEffect, useRef } from "react";
import { Grid, Typography } from "@mui/material";
import styles from "../../styles/LandingImage.module.scss";
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
            <Grid item xs={12} className={styles.contentGrid}>
                <Typography
                    variant="h4"
                    className={styles.contentGrid__upperText}
                >
                    Hello I&apos;m
                </Typography>
                <Typography
                    variant="h3"
                    className={styles.contentGrid__midText}
                    ref={el}
                />
                <Typography
                    variant="h4"
                    className={styles.contentGrid__lowerText}
                >
                    a web developer
                </Typography>
                <button className={styles.button}>Check out my blog!</button>
            </Grid>
        </Grid>
    );
};

export default LandingImage;
