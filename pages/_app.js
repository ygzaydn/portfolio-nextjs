import React from "react";

import "../styles/main.scss";
import "../styles/globals.css";

import { Oxygen } from "next/font/google";

const oxygen = Oxygen({ subsets: ["latin"], weight: ["400"] });

function MyApp(props) {
    const { Component, pageProps } = props;

    return (
        <main className={oxygen.className}>
            <Component {...pageProps} />
        </main>
    );
}

export default MyApp;
