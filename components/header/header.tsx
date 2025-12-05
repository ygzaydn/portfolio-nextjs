import React, { useEffect } from "react";

import { useRouter } from "next/router";

const Header: React.FC = () => {
	const router = useRouter();
	const { asPath } = useRouter();

	const scrollTo = (element: string): void => {
		if (asPath !== "/") {
			router.push({ pathname: "/", query: { element } }, "/");
		} else {
			document.getElementById(`${element}`).scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	};

	useEffect(() => {
		const scrollFunc = (): void => {
			let y = window.scrollY;
			let header = document.getElementById("header");
			if (header) {
				if (y) {
					header.style.backgroundColor = "#000";
					header.style.borderBottom = "0.2px solid lightgray";
					header.style.zIndex = "500";
					header.style.padding = "0";
					header.style.padding = "0";
					header.style.top = "0";
				} else {
					header.style.background = "#0005";
					header.style.borderBottom = "none";
					header.style.padding = "0 10rem";
					header.style.top = "-20rem";
				}
			}
		};

		scrollFunc();

		window.addEventListener("scroll", () => scrollFunc());
		return (): void =>
			window.removeEventListener("scroll", () => scrollFunc());
	}, []);

	const navigate = (path: string): Promise<boolean> => router.push(path);

	return (
		<header className="sticky inset-0 z-50 transition-all ">
			<div
				className="flex fixed items-center inset-0 transition-all duration-1000 h-28 min-h-80 -top-80 w-full"
				id="header"
			>
				<div className="flex flex-row mx-auto w-full max-w-7xl ">
					<div
						className="group flex mx-10 sm:flex-1 sm:mx-0 sm:justify-center cursor-pointer"
						onClick={() => scrollTo("home")}
					>
						<h3 className="text-slate-50 text-3xl sm:text-2xl transition group group-hover:text-green-400">
							erolyagiz
						</h3>
						<h3 className="text-green-400 text-3xl sm:text-2xl transition ">
							aydin
						</h3>
					</div>

					<div className="flex justify-evenly flex-1 sm:hidden">
						<h3
							key="home-desktop"
							id="header-home"
							className="text-slate-50 text-xl transition cursor-pointer hover:text-green-400 "
							onClick={() => scrollTo("home")}
						>
							Home
						</h3>
						<h3
							key="services-desktop"
							id="header-services"
							className="text-slate-50 text-xl cursor-pointer hover:text-green-400 transition-all"
							onClick={() => scrollTo("servicesGrid")}
						>
							Services
						</h3>
						<h3
							key="stack-desktop"
							id="header-stack"
							className="text-slate-50 text-xl cursor-pointer hover:text-green-400 transition-all"
							onClick={() => scrollTo("techStack")}
						>
							Tech
						</h3>
						<h3
							key="project-desktop"
							id="header-projects"
							className="text-slate-50 text-xl cursor-pointer hover:text-green-400 transition-all"
							onClick={() => scrollTo("projectsGrid")}
						>
							Projects
						</h3>
						{/* <h3
              className="text-slate-50 text-xl cursor-pointer hover:text-green-400 transition-all"
              onClick={() => window.open("/cv")}
            >
              CV
            </h3> */}
						<h3
							key="blog"
							className="text-slate-50 text-xl cursor-pointer hover:text-green-400 transition-all"
							id="header-blog"
							onClick={() => navigate("/blog")}
						>
							Blog
						</h3>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
