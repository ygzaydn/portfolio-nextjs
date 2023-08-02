import Head from "next/head";

import { useEffect } from "react";

import Layout from "../components/layout/layout";
import { useRouter } from "next/router";

import LandingImage from "../components/landingImage/landingImage";
import ServicesGrid from "../components/servicesGrid/servicesGrid";
import TechGrid from "../components/techGrid/techGrid";
import ProjectsStack from "../components/projectsStack/projectsStack";
import ContactGrid from "../components/contactGrid/contactGrid";
import BlogGrid from "../components/blogGrid/blogGrid";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (router?.query?.element && typeof router?.query?.element === "string") {
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
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
          <meta
            name="description"
            content="Portfolio page of Erol Yağız Aydın"
          />

          <link rel="icon" href="/favicon/favicon.ico" />
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
