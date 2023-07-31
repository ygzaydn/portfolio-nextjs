import Head from "next/head";

import { useEffect } from "react";

import Layout from "../components/layout/layout";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import BlogGrid from "../components/blogGrid/blogGrid";

const LandingImage = dynamic(
    () => import("../components/landingImage/landingImage")
);
const ServicesGrid = dynamic(
    () => import("../components/servicesGrid/servicesGrid")
);
const TechGrid = dynamic(() => import("../components/techGrid/techGrid"));
const ProjectsStack = dynamic(
    () => import("../components/projectsStack/projectsStack")
);
const ContactGrid = dynamic(
    () => import("../components/contactGrid/contactGrid")
);

const Home: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        if (
            router?.query?.element &&
            typeof router?.query?.element === "string"
        ) {
            document.getElementById(router.query.element).scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, []);

    return (
        <Layout>
            <div>
                <Head>
                    <title>erolyagizaydin</title>
                    <meta
                        name="description"
                        content="Portfolio page of Erol Yağız Aydın"
                    />
                    <link rel="icon" href="/favicon/favicon.ico" />
                    <meta
                        name="viewport"
                        content="initial-scale=1, width=device-width"
                    />
                </Head>
                <main>
                    <LandingImage />
                    <ServicesGrid />
                    <TechGrid />
                    <BlogGrid />
                    <ProjectsStack />

                    <ContactGrid />
                </main>
            </div>
        </Layout>
    );
};

export default Home;
