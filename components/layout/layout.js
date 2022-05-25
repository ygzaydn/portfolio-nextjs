import Head from "next/head";
import Footer from "../footer/footer";
import Header from "../header/header";

const Layout = ({ children }) => {
    return (
        <>
            <Head></Head>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    );
};

export default Layout;
