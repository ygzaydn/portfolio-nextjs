import Head from "next/head";
import Footer from "../footer/footer";
import Header from "../header/header";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
    const { asPath } = useRouter();

    return (
        <>
            <Head></Head>
            {asPath !== "/blog" && <Header />}

            {children}
            <Footer />
        </>
    );
};

export default Layout;
