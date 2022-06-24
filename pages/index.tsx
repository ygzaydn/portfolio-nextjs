import Head from "next/head";
import Image from "next/image";

import { useEffect } from "react";

import Layout from "../components/layout/layout";
import LandingImage from "../components/landingImage/landingImage";
import ServicesGrid from "../components/servicesGrid/servicesGrid";
import TechGrid from "../components/techGrid/techGrid";
import ProjectsStack from "../components/projectsStack/projectsStack";
import ContactGrid from "../components/contactGrid/contactGrid";

import { useRouter } from "next/router";

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
                    <ProjectsStack />
                    <ContactGrid />
                </main>
            </div>
        </Layout>
    );
};

export default Home;