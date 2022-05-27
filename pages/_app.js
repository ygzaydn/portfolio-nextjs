import React, { useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import {
    ThemeProvider,
    CssBaseline,
    StyledEngineProvider,
} from "@mui/material";

import createEmotionCache from "../utils/createEmotionCache";

import "../styles/main.scss";
import "../styles/globals.css";
import Head from "next/head";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;

    return (
        <StyledEngineProvider injectFirst>
            <CacheProvider value={emotionCache}>
                <CssBaseline />
                <Component {...pageProps} />
            </CacheProvider>
        </StyledEngineProvider>
    );
}

export default MyApp;
