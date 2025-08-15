import { motion } from "framer-motion";
import { useRouter } from "next/router";

const LandingImage = () => {
	const router = useRouter();

	return (
		<div
			className="flex bg-cover bg-no-repeat bg-center py-48 min-h-550 pb-64"
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
				className="absolute w-full h-full object-cover inset-0 z-0"
				alt="landing-image-background"
			/>

			<div className="flex flex-col mx-auto max-w-7xl px-5 w-full z-10 items-center">
				<motion.h4
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ ease: "easeOut", duration: 1 }}
					className="text-5xl text-slate-50 my-2"
				>
					Hello I&apos;m
				</motion.h4>
				<motion.h3
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ ease: "easeIn", duration: 2 }}
					className="text-6xl text-green-300 my-2"
				>
					erolyagizaydin
				</motion.h3>
				<motion.h4
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ ease: "easeOut", duration: 1 }}
					className="text-5xl text-slate-50 my-2"
				>
					a tech guy
				</motion.h4>
				<button
					className="bg-blue-900 my-6 px-8 py-3 rounded-md ring-4 font-semibold text-slate-50 hover:bg-blue-800 transition-all text-xl ring-blue-800"
					onClick={() => router.push("/blog")}
				>
					Check out my blog!
				</button>
				<button
					className="py-1 rounded-md text-slate-50  text-lg underline"
					onClick={() => window.open("/cv")}
				>
					my resume
				</button>
			</div>
		</div>
	);
};

export default LandingImage;
