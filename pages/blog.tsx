import { useState } from "react";
import Head from "next/head";

import Layout from "../components/layout/layout";

import { blogTechnologies } from "../constants/blogTechnologies";
import blogPosts from "../blog";
import { useRouter } from "next/router";

const Blog: React.FC = () => {
  const [topic, setTopic] = useState<string>("");
  const router = useRouter();

  const allPosts = Array.isArray(blogPosts) ? [...blogPosts] : [];
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const postsByTopic = topic
    ? allPosts.filter((p) => p.topic === topic)
    : allPosts;
  const searchLower = search.trim().toLowerCase();
  const searched =
    searchLower === ""
      ? postsByTopic
      : postsByTopic.filter(
          (p) =>
            (p.title && p.title.toLowerCase().includes(searchLower)) ||
            (p.excerpt && p.excerpt.toLowerCase().includes(searchLower))
        );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.max(1, Math.ceil(searched.length / ITEMS_PER_PAGE));
  const pageStart = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = searched.slice(pageStart, pageStart + ITEMS_PER_PAGE);

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Layout>
        <Head>
          <title>Blog - erolyagizaydin</title>
          <meta name="description" content="Blog page of Erol Yağız Aydın" />
          <link rel="icon" href="/favicon/favicon.ico" />
        </Head>

        <main className="py-12 px-4 sm:py-8">
          <div className="mx-auto">
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold">Blog</h1>
              <p className="mt-2 text-slate-300">
                Notes, experiments and guides I wrote while learning and
                building things.
              </p>
            </header>
          </div>

          <div
            className="flex mx-auto justify-center gap-8"
            style={{ maxWidth: "1440px" }}
          >
            {/* Left nav - fixed on md+, inline on small */}
            <aside className="md:fixed md:top-24 md:left-0">
              <div className="p-4">
                <label htmlFor="blog-search" className="sr-only">
                  Search posts
                </label>
                <input
                  id="blog-search"
                  placeholder="Search posts..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3 py-2 rounded-md bg-slate-800 text-slate-100 placeholder-slate-400 mb-4"
                />

                <div className="flex flex-col gap-2">
                  {blogTechnologies.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => {
                        setTopic(t.key);
                        setPage(1);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition text-left ${
                        topic === t.key
                          ? "bg-blue-500 text-white"
                          : "bg-slate-800 text-slate-200/80"
                      }`}
                    >
                      <img
                        src={`/logo/${t.logo}.svg`}
                        alt={t.name}
                        className="w-5 h-5"
                      />
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Posts area - add left margin on md to make space for fixed nav */}
            <div className="mx-auto px-4 sm:px-0 w-full">
              {/* Pagination controls (moved to top) */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    Showing {(pageStart + 1).toString()} -{" "}
                    {Math.min(pageStart + ITEMS_PER_PAGE, searched.length)} of{" "}
                    {searched.length}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded-md text-sm ${
                      page === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "bg-slate-800 text-slate-100 hover:bg-slate-700"
                    }`}
                  >
                    Prev
                  </button>
                  <span className="text-sm text-slate-300">
                    Page {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className={`px-3 py-1 rounded-md text-sm ${
                      page === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "bg-slate-800 text-slate-100 hover:bg-slate-700"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {searched.length === 0 ? (
                  <div className="col-span-full text-center text-slate-400 py-12">
                    No posts match your filters.
                  </div>
                ) : (
                  pageItems.map((p) => (
                    <article
                      key={p.key}
                      onClick={() => router.push(`/blog/${p.key}`)}
                      className="cursor-pointer bg-slate-800 hover:bg-slate-700 transition p-4 rounded-lg flex flex-col"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={`/logo/${p.logoName}.svg`}
                          alt={p.title}
                          className="w-9 h-9"
                        />
                        <h4 className="text-lg font-semibold">{p.title}</h4>
                        <span className="ml-auto text-sm text-slate-400">
                          {p.createDate}
                        </span>
                      </div>
                      {p.excerpt && (
                        <p className="mt-3 text-slate-300 text-sm">
                          {p.excerpt}
                        </p>
                      )}
                      <div className="mt-4 pt-3 border-t border-slate-700 flex gap-2">
                        <span className="text-xs text-slate-400 px-2 py-1 bg-slate-900 rounded-md">
                          {p.topic}
                        </span>
                        <button className="ml-auto text-xs text-blue-400">
                          Read →
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>

              {/* end posts container */}
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default Blog;
