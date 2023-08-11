import blogPosts from "../../blog";
import BlogCard from "../blogCard/blogCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Title from "../title/title";

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
            className=" group/stack flex flex-col max-w-7xl mx-auto px-8 mb-16"
        >
            <div className="mb-8">
                <Title title="Recent Blog Posts" color="blue" />
            </div>
            <div className="grid grid-cols-3 gap-5 items-stretch ">
                {domLoaded &&
                    blogPosts
                        .slice(0, 3)
                        .map((el) => (
                            <BlogCard
                                key={el.key}
                                title={el.title}
                                img={`logo/${el.logoName}.svg`}
                                tag={el.topic}
                                id={el.key}
                            />
                        ))}
            </div>

            <button
                className="bg-blue-900 my-6 px-8 py-4 rounded-md font-semibold text-slate-50 hover:bg-blue-800 transition-all text-xl"
                onClick={() => navigate("/blog")}
            >
                Click to read more blog posts
            </button>
        </div>
    );
};

export default BlogGrid;
