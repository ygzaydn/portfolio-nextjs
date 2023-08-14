import { useState } from "react";
import Head from "next/head";

import Layout from "../components/layout/layout";

import { blogTechnologies } from "../constants/blogTechnologies";
import blogPosts from "../blog";
import { useRouter } from "next/router";

const Blog: React.FC = () => {
    const [topic, setTopic] = useState<string>("");
    const router = useRouter();

    const filteredPosts = () => {
        if (blogPosts) {
            if (topic != "") {
                return blogPosts.reverse()?.filter((el) => el.topic === topic);
            }
            return blogPosts;
        }
    };

    return (
        <div
            style={{
                minHeight: "100%",
                backgroundImage:
                    "linear-gradient(180deg,rgba(3, 1, 22, 0.7287289915966386) 0%,rgba(71, 61, 113, 0.7371323529411764) 17%, rgba(255, 255, 255, 1) 100%",
            }}
        >
            <Layout>
                <Head>
                    <title>Blog - erolyagizaydin</title>
                    <meta
                        name="description"
                        content="Blog page of Erol Yağız Aydın"
                    />
                    <link rel="icon" href="/favicon/favicon.ico" />
                </Head>

                <main className="py-16 px-2 sm:py-8">
                    {/*<img
                        src="webP/blogBackground.webp"
                        alt="blog-page-background"
                        className="absolute h-max w-full object-cover -z-10 inset-0"
                    />*/}
                    <h3 className="text-center text-white text-4xl">Blog</h3>
                    <h5 className="text-center text-white text-2xl my-5">
                        You can find my blog posts here. I like writing while
                        learning new stuff!
                    </h5>
                    <div
                        className="flex justify-center sm:flex-col flex-wrap my-10 max-w-7xl mx-auto px-10 sm:px-0"
                        style={{ height: "70vh" }}
                    >
                        <div className="bg-gray-900 flex-1 m-2  overflow-y-auto">
                            <h6 className="text-blue-400 text-center text-2xl py-4 border-b-2 border-blue-400 sticky inset-0 bg-gray-900">
                                Topics
                            </h6>
                            {blogTechnologies.map((el) => (
                                <div
                                    key={el.key}
                                    onClick={() => setTopic(el.key)}
                                    className="flex my-4 pl-5 hover:bg-orange-500 transition-all cursor-pointer items-center overflow-y-auto"
                                >
                                    <img
                                        src={`/logo/${el.logo}.svg`}
                                        alt={`${el.logo}`}
                                        className="w-10 h-10"
                                    />
                                    <h6 className="text-xl text-white ml-5">
                                        {el.name}
                                    </h6>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-900 flex-1 m-2 h-full overflow-y-auto">
                            <h6 className="text-blue-400 text-center text-2xl py-4 border-b-2 border-blue-400 sticky inset-0 bg-gray-900">
                                Posts
                            </h6>
                            {filteredPosts().map(
                                ({ title, logoName, createDate, key }) => (
                                    <div
                                        key={title}
                                        className="flex my-4 pl-5 hover:bg-orange-500 transition-all cursor-pointer items-center overflow-y-auto"
                                        onClick={() =>
                                            router.push(`/blog/${key}`)
                                        }
                                    >
                                        <img
                                            src={`/logo/${logoName}.svg`}
                                            alt={`${logoName}`}
                                            className="w-10 h-10"
                                        />
                                        <h6 className="text-xl text-white ml-5">
                                            {title}
                                        </h6>
                                        <p className="text-md text-gray-400 ml-auto mr-2 text-right">
                                            {createDate}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="flex my-5 justify-center">
                        <button
                            className="bg-blue-400  mt-16 px-8 py-2 text-xl rounded-md font-semibold text-slate-50 hover:bg-blue-500 transition-all"
                            onClick={() => router.push("/")}
                        >
                            Back to Home
                        </button>
                    </div>
                </main>
            </Layout>
        </div>
    );
};

export default Blog;
