import React from "react";

import "../styles/main.scss";
import "../styles/globals.css";

function MyApp(props) {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
}

export default MyApp;
