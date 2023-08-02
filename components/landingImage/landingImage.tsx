import { useEffect, useRef } from "react";
import Typed from "typed.js";

import { useRouter } from "next/router";

const LandingImage = () => {
  const router = useRouter();
  const el = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["erolyagizaydin"],
      typeSpeed: 50,
      backSpeed: 50,
      showCursor: false,
      loop: true,
    });

    // Destroying
    return (): void => {
      typed.destroy();
    };
  }, []);

  return (
    <div
      className="flex bg-cover bg-no-repeat bg-center py-40 min-h-550"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 85%)" }}
      id="home"
      data-testid="overallGrid"
    >
      <img
        sizes="(max-width: 1920px) 100vw, 1920px"
        srcSet="
                        webP/landingBackground_vmka27_c_scale,w_500.webp 500w,
                        webP/landingBackground_vmka27_c_scale,w_997.webp 997w,
                        webP/landingBackground_vmka27_c_scale,w_1428.webp 1428w,
                        webP/landingBackground_vmka27_c_scale,w_1728.webp 1728w,
                        webP/landingBackground_vmka27_c_scale,w_1920.webp 1920w
                        "
        src="webP/landingBackground_vmka27_c_scale,w_1920.webp"
        className="absolute w-full h-full object-cover z-index-5 inset-0 z-0"
        alt="landing-image-background"
      />

      <div className="flex flex-col items-start mx-auto  max-w-7xl px-5 w-full z-10">
        <h4 className="text-3xl text-slate-50 my-1">Hello I&apos;m</h4>
        <h3 className="text-4xl text-green-300 h-10 my-1" ref={el} />
        <h4 className="text-3xl text-slate-50 my-1">a web developer</h4>
        <button
          className="bg-blue-400 my-5 px-6 py-5 rounded-md font-semibold text-slate-50 hover:bg-blue-500 transition-all"
          onClick={() => router.push("/blog")}
        >
          Check out my blog!
        </button>
      </div>
    </div>
  );
};

export default LandingImage;
