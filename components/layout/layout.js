import Head from "next/head";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div>{children}</div>
        </>
    );
};

export default Layout;
