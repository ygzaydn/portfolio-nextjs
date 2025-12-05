import React, { useEffect, useState, useRef } from "react";
import { Grid, Typography } from "@mui/material";

import Head from "next/head";
import ReactMarkdown from "react-markdown";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import blogPosts from "../../blog";

import { readMarkdownFile } from "../../utils/readMarkdown";
import Layout from "../../components/layout/layout";

import { useRouter } from "next/router";

function flatten(text, child) {
	return typeof child === "string"
		? text + child
		: React.Children.toArray(child.props.children).reduce(flatten, text);
}

// Slug counters for multiple slug styles (github and legacy simple)
let slugCounters: { [kind: string]: { [key: string]: number } } = {
	github: {},
	simple: {},
};
function githubSlug(text: string) {
	// normalize diacritics, lowercase
	let s = text
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();

	// remove characters that are not alphanumeric, space or hyphen
	s = s.replace(/[^a-z0-9\s-]/g, "");

	// replace spaces with hyphens, collapse multiple hyphens, trim
	s = s
		.trim()
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-+|-+$/g, "");
	return s;
}

function makeUnique(base: string, map: { [key: string]: number }) {
	const count = map[base] || 0;
	const slug = count === 0 ? base : `${base}-${count}`;
	map[base] = count + 1;
	return slug;
}

function simpleSlug(text: string) {
	// legacy simple slug: lowercase and replace non-word chars with hyphens
	return text
		.toLowerCase()
		.replace(/\W+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

function HeadingRenderer(props) {
	const children = React.Children.toArray(props.children);
	const text = children.reduce(flatten, "");

	// compute both github-style and legacy simple slugs
	const baseGithub = githubSlug(text);
	const baseSimple = simpleSlug(text);

	// Use plain slugs (no numeric suffix) so TOC links match generated anchors
	const idGithub = baseGithub;
	const idSimple = baseSimple;

	let className = props.className ? props.className + " " : "";
	let level = Number(props.level);
	if (!level || level < 1 || level > 6) level = 2; // fallback to h2
	switch (level) {
		case 1:
			className += "text-4xl font-extrabold mt-10 mb-4";
			break;
		case 2:
			className += "text-3xl font-bold mt-8 mb-3";
			break;
		case 3:
			className += "text-2xl font-semibold mt-6 mb-2";
			break;
		case 4:
			className += "text-xl font-medium mt-4 mb-1";
			break;
		default:
			className += "font-medium";
	}

	const Tag: any = `h${level}`;
	return (
		<>
			{/* emit a legacy anchor for old TOC generators */}
			<span id={idSimple} aria-hidden="true" />
			<Tag id={idGithub} className={className}>
				{props.children}
			</Tag>
		</>
	);
}

// Use rehype-highlight plugin to render code blocks with GitHub styling.

interface infoObject {
	title: string;
	createDate: string;
}

interface BlogPostProps {
	file: string;
	info: infoObject;
}

const BlogPost: React.FC<BlogPostProps> = ({ file, info }) => {
	const router = useRouter();

	useEffect(() => {
		let documents: NodeListOf<Element> | null = null;

		function resolveAnchor(href: string): Element | null {
			if (!href) return null;
			// ensure leading #
			const raw = href.startsWith("#") ? href : `#${href}`;
			const name = raw.slice(1);

			// 1) try exact id
			let el = document.querySelector(raw);
			if (el) return el;

			// 2) try numeric suffixes up to 20 (cover wider cases)
			for (let i = 1; i <= 20; i++) {
				el = document.querySelector(`#${name}-${i}`);
				if (el) return el;
			}

			// 3) try GitHub-style slug and its numbered variants
			const gh = githubSlug(name);
			el = document.querySelector(`#${gh}`);
			if (el) return el;
			for (let i = 1; i <= 20; i++) {
				el = document.querySelector(`#${gh}-${i}`);
				if (el) return el;
			}

			// 4) fallback: find any element whose id starts with the name or contains the name
			// This handles cases where renderer appended a suffix we didn't anticipate.
			el = document.querySelector(`[id^="${name}"]`);
			if (el) return el;
			el = document.querySelector(`[id*="${name}"]`);
			if (el) return el;

			return null;
		}

		function onAnchorClick(e: Event) {
			const target = e.currentTarget as HTMLAnchorElement;
			e.preventDefault();
			const href = target.getAttribute("href") || "";
			const el = resolveAnchor(href);
			if (el) {
				(el as HTMLElement).scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
		}

		if (typeof document !== "undefined") {
			documents = document.querySelectorAll('a[href^="#"]');
			documents.forEach((el) =>
				el.addEventListener("click", onAnchorClick)
			);
		}

		return () => {
			if (documents)
				documents.forEach((el) =>
					el.removeEventListener("click", onAnchorClick)
				);
		};
	}, []);

	// no slug counters needed when using plain slugs

	return (
		<div className="bg-white min-h-screen text-black">
			<Layout>
				<Head>
					<title>{`${info.title} - erolyagizaydin`}</title>
					<meta
						name="description"
						content={`${info.title} erolyagizaydin`}
					/>
					<link rel="icon" href="/favicon/favicon.ico" />
				</Head>
				<div
					className="flex w-full relative bg-no-repeat bg-center"
					style={{ height: "70vh" }}
				>
					<img
						sizes="(max-width: 1200px) 100vw, 1200px"
						srcSet="
                            /webP/blogPostBackground_z0aa3y_c_scale,w_300.webp 300w,
                            /webP/blogPostBackground_z0aa3y_c_scale,w_845.webp 845w,
                            /webP/blogPostBackground_z0aa3y_c_scale,w_1200.webp 1200w
                        "
						src="/webP/blogPostBackground_z0aa3y_c_scale,w_1200.webp"
						alt="blogpostbackground-bg"
						className="absolute inset-0 -z-5 h-full w-full object-cover"
					/>

					<div className="absolute bottom-0 left-0 min-w-1/2 bg-gray-400/60 flex flex-col px-4 py-2 max-w-full">
						<KeyboardReturnIcon
							className="text-gray-900 mt-2 text-4xl cursor-pointer"
							onClick={() => router.push("/blog")}
						/>
						<h4 className="my-2 text-gray-800 text-3xl mb-2 w-full line-bre">
							{info.title}
						</h4>
						<p className="text-left text-gray-700 text-lg">
							{info.createDate}
						</p>
					</div>
				</div>
				<div className="markdownGrid markdown-body mx-auto px-6 py-12">
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[
							rehypeRaw as any,
							rehypeHighlight as any,
						]}
						components={{
							a: ({ href, children, ...props }) => (
								<a
									href={href}
									{...props}
									className="text-sky-600 hover:underline"
									target={
										href && href.startsWith("#")
											? undefined
											: "_blank"
									}
									rel={
										href && href.startsWith("#")
											? undefined
											: "noopener noreferrer"
									}
								>
									{children}
								</a>
							),
							img: ({ src, alt, title, ...props }) => (
								// keep plain <img> to allow external URLs in markdown
								<img
									src={src}
									alt={alt}
									title={title}
									className="rounded-md mx-auto my-6"
									{...props}
								/>
							),
							table: ({ node, ...props }) => (
								<table
									className="table-auto border-collapse border border-gray-300 my-6"
									{...props}
								/>
							),
							thead: ({ node, ...props }) => (
								<thead className="bg-gray-100" {...props} />
							),
							tbody: ({ node, ...props }) => <tbody {...props} />,
							tr: ({ node, ...props }) => (
								<tr
									className="border-b border-gray-200"
									{...props}
								/>
							),
							th: ({ node, ...props }) => (
								<th
									className="border border-gray-200 px-4 py-2 bg-gray-50"
									{...props}
								/>
							),
							td: ({ node, ...props }) => (
								<td
									className="border border-gray-200 px-4 py-2"
									{...props}
								/>
							),
							h1: (props) => (
								<HeadingRenderer {...props} level={1} />
							),
							h2: (props) => (
								<HeadingRenderer {...props} level={2} />
							),
							h3: (props) => (
								<HeadingRenderer {...props} level={3} />
							),
							h4: (props) => (
								<HeadingRenderer {...props} level={4} />
							),
							h5: (props) => (
								<HeadingRenderer {...props} level={5} />
							),
							h6: (props) => (
								<HeadingRenderer {...props} level={6} />
							),
							pre: ({ node, ...props }) => (
								<pre
									className="bg-gray-100 border rounded-md p-4 overflow-x-auto"
									{...props}
								/>
							),
							code: ({ node, ...props }) => (
								<code
									className="bg-gray-200 px-1 py-0.5 rounded text-sm"
									{...props}
								/>
							),
						}}
					>
						{file}
					</ReactMarkdown>
				</div>
				<div className="pageFooter">
					<p>
						I hope that this article will help you on your journey.
						You can go back to{" "}
						<strong onClick={() => router.push("/blog")}>
							blog page
						</strong>{" "}
						or{" "}
						<strong onClick={() => router.push("/")}>
							homepage
						</strong>
						.
					</p>
				</div>
			</Layout>
		</div>
	);
};

export async function getStaticPaths() {
	return {
		paths: blogPosts.map((el) => ({
			params: {
				id: el.key,
			},
		})),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const id = params.id;
	const fileInfo = blogPosts.filter((el) => el.key == id)[0];

	const file = await readMarkdownFile(fileInfo.name);

	return {
		props: { file, info: fileInfo },
	};
}

export default BlogPost;
