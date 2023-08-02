import * as React from "react";

import { useRouter } from "next/router";

interface IBlogCard {
  title: string;
  img: string;
  tag: string;
  id: string;
}

export default function BlogCard({ title, img, tag, id }: IBlogCard) {
  const router = useRouter();
  const navigate = (path: string): Promise<boolean> => router.push(path);

  return (
    <div className="group rounded-md shadow-md border-2 flex justify-center hover:bg-blue-100 transition">
      <button
        className="flex flex-col items-center justify-center px-5 h-100"
        onClick={() => {
          navigate(`/blog/${id}`);
        }}
      >
        <img
          className="w-24 h-24 my-10 object-contain group-hover:scale-125 transition"
          src={img}
          alt={title}
        />
        <div className="flex flex-col items-start py-4 flex-1">
          <h5 className="mb-4 text-2xl text-blue-400 group-hover:text-blue-900 transition">
            {tag[0].toUpperCase() + tag.slice(1)}
          </h5>
          <h4 className="mb-4 text-md group-hover:text-blue-800 transition  flex-1">
            {title}
          </h4>
          <button
            className="text-blue-500 underline group-hover:text-blue-900 transition"
            color="primary"
          >
            Click to read
          </button>
        </div>
      </button>
    </div>
  );
}
