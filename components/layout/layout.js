import Head from "next/head";

const Layout = ({ children }) => {
    return (
        <>
            <Head></Head>
            <div>{children}</div>
        </>
    );
};

export default Layout;
