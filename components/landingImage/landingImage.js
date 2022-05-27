import { useEffect, useRef } from "react";
import { Grid, Typography } from "@mui/material";
import Typed from "typed.js";
import BackgroundImage from "../../public/webP/landingBackground.webp";

import Router, { useRouter } from "next/router";

const LandingImage = () => {
    const router = useRouter();
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
            className="landingImage"
            id="home"
            style={{ backgroundImage: `url(${BackgroundImage.src})` }}
        >
            <Grid item xs={12} className="landingImage__contentGrid">
                <Typography
                    variant="h4"
                    className="landingImage__contentGrid__upperText"
                >
                    Hello I&apos;m
                </Typography>
                <Typography
                    variant="h3"
                    className="landingImage__contentGrid__midText"
                    ref={el}
                />
                <Typography
                    variant="h4"
                    className="landingImage__contentGrid__lowerText"
                >
                    a web developer
                </Typography>
                <button
                    className="landingImage__button"
                    onClick={() => router.push("/blog")}
                >
                    Check out my blog!
                </button>
            </Grid>
        </Grid>
    );
};

export default LandingImage;
