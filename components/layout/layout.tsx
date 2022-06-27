import Footer from "../footer/footer";
import Header from "../header/header";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Head from "next/head";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { asPath } = useRouter();

    return (
        <>
            <Head>
              
            </Head>
            {asPath !== "/blog" && <Header />}
            {children}
            <Footer />
        </>
    );
};

export default Layout;

/*
  <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap"
                    rel="stylesheet"
                />*/
                