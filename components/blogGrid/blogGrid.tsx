import blogPosts from "../../blog";
import BlogCard from "../blogCard/blogCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const BlogGrid: React.FC = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  const router = useRouter();
  const navigate = (path: string): Promise<boolean> => router.push(path);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <div id="blogGrid" className="flex flex-col max-w-7xl mx-auto px-8 mb-16">
      <div className="mb-8">
        <h4 className="text-blue-400 text-4xl text-left mt-8 mb-4">
          Recent Blog Posts
        </h4>
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
        className="bg-blue-400 my-5 px-6 py-5 rounded-md font-semibold text-slate-50 hover:bg-blue-500 transition-all my-10"
        onClick={() => navigate("/blog")}
      >
        Click to read more blog posts
      </button>
    </div>
  );
};

export default BlogGrid;
