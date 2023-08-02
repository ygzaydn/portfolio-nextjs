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
        block: "start",
      });
    }
  };

  useEffect(() => {
    const scrollFunc = (): void => {
      let y = window.pageYOffset;
      let header = document.getElementById("header");
      if (header) {
        if (y) {
          header.style.backgroundColor = "#000";
          header.style.borderBottom = "0.2px solid lightgray";
          header.style.zIndex = "500";
          header.style.padding = "0";
          header.style.visibility = "visible";
        } else {
          header.style.backgroundColor = "inherit";
          header.style.borderBottom = "none";
          header.style.padding = "2%";
        }
      }
    };

    scrollFunc();

    window.addEventListener("scroll", () => scrollFunc());
    return (): void => window.removeEventListener("scroll", () => scrollFunc());
  }, []);

  const navigate = (path: string): Promise<boolean> => router.push(path);

  return (
    <header>
      <div
        className=" flex fixed items-center inset-0 transition-all h-28 min-h-80 invisible"
        id="header"
      >
        <div className="flex flex-row mx-auto w-full max-w-7xl">
          <div className="flex mx-10" onClick={() => scrollTo("home")}>
            <h3 className="text-slate-50 text-3xl transition">erolyagiz</h3>
            <h3 className="text-green-400 text-3xl transition">aydin</h3>
          </div>

          <div className="flex justify-evenly flex-1 md:hidden">
            <h3
              key="home-desktop"
              id="header-home"
              className="text-slate-50 text-xl transition cursor-pointer hover:text-green-400 transition-all"
              onClick={() => scrollTo("home")}
            >
              Home
            </h3>
            <h3
              key="services-desktop"
              id="header-services"
              className="text-slate-50 text-xl transition cursor-pointer hover:text-green-400 transition-all"
              onClick={() => scrollTo("servicesGrid")}
            >
              Services
            </h3>
            <h3
              key="stack-desktop"
              id="header-stack"
              className="text-slate-50 text-xl transition cursor-pointer hover:text-green-400 transition-all"
              onClick={() => scrollTo("techStack")}
            >
              Tech
            </h3>
            <h3
              key="project-desktop"
              id="header-projects"
              className="text-slate-50 text-xl transition cursor-pointer hover:text-green-400 transition-all"
              onClick={() => scrollTo("projectsGrid")}
            >
              Projects
            </h3>
            <h3
              key="contact-desktop"
              id="header-contacts"
              className="text-slate-50 text-xl transition cursor-pointer hover:text-green-400 transition-all"
              onClick={() => scrollTo("contactGrid")}
            >
              Contact
            </h3>
            <h3
              key="blog"
              className="text-slate-50 text-xl transition cursor-pointer hover:text-green-400 transition-all"
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
