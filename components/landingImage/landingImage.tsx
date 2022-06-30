import { useEffect, useRef } from "react";
import { Grid, Typography } from "@mui/material";
import Typed from "typed.js";

import { useRouter } from "next/router";

const LandingImage = () => {
    const router = useRouter();
    const el = useRef<HTMLHeadingElement>(null);

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
        return (): void => {
            typed.destroy();
        };
    }, []);

    return (
        <Grid
            container
            className="landingImage"
            id="home"
            data-testid="overallGrid"
        >
            <img
                sizes="(max-width: 1920px) 100vw, 1920px"
                srcSet="
                        webP/landingBackground_vmka27_c_scale,w_500.webp 500w,
                        webP/landingBackground_vmka27_c_scale,w_997.webp 997w,
                        webP/landingBackground_vmka27_c_scale,w_1428.webp 1428w,
                        webP/landingBackground_vmka27_c_scale,w_1728.webp 1728w,
                        webP/landingBackground_vmka27_c_scale,w_1920.webp 1920w
                        "
                src="webP/landingBackground_vmka27_c_scale,w_1920.webp"
                className="landingImage__image"
                alt="landing-image-background"
            />

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
