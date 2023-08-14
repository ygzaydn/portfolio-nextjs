import blogPosts from "../../blog";
import BlogCard from "../blogCard/blogCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Title from "../title/title";
import { motion } from "framer-motion";

const BlogGrid: React.FC = () => {
    const [domLoaded, setDomLoaded] = useState(false);

    const router = useRouter();
    const navigate = (path: string): Promise<boolean> => router.push(path);

    useEffect(() => {
        setDomLoaded(true);
    }, []);
    return (
        <div
            id="blogGrid"
            className=" group/stack flex flex-col max-w-7xl mx-auto px-8 my-16"
        >
            <motion.div
                className="mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                variants={{
                    visible: { opacity: 1, scale: 1 },
                    hidden: { opacity: 0, scale: 1 },
                }}
            >
                <Title title="Recent Blog Posts" color="blue" />
            </motion.div>
            <div className="grid grid-cols-3 gap-5 items-stretch ">
                {domLoaded &&
                    blogPosts.slice(0, 3).map((el, ind) => (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.3,
                                delay: ind * 0.2 + 0.6,
                            }}
                            key={el.key}
                            variants={{
                                visible: { opacity: 1, scale: 1 },
                                hidden: { opacity: 0, scale: 0 },
                            }}
                        >
                            <BlogCard
                                key={el.key}
                                title={el.title}
                                img={`logo/${el.logoName}.svg`}
                                tag={el.topic}
                                id={el.key}
                            />
                        </motion.div>
                    ))}
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                    duration: 0.3,
                    delay: 1.5,
                }}
                variants={{
                    visible: { opacity: 1, scale: 1 },
                    hidden: { opacity: 0, scale: 0 },
                }}
            >
                <button
                    className="bg-blue-900 my-6 px-8 py-4 rounded-md font-semibold text-slate-50 hover:bg-blue-800 transition-all text-xl w-full"
                    onClick={() => navigate("/blog")}
                >
                    Click to read more blog posts
                </button>
            </motion.div>
        </div>
    );
};

export default BlogGrid;
