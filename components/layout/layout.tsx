import Footer from "../footer/footer";
import Header from "../header/header";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { asPath } = useRouter();

    return (
        <>
            {asPath !== "/blog" && <Header />}
            {children}
            <Footer />
        </>
    );
};

export default Layout;
