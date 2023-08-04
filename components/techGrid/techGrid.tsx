import TechStack from "../techStack/techStack";

const TechGrid: React.FC = () => {
    return (
        <div
            className="relative pt-16 pb-36 px-10 "
            style={{
                clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 90%, 60% 90%, 50% 100%, 40% 90%, 0% 90%)",
                paddingBottom: "15rem",
            }}
            id="techStack"
        >
            <img
                src="webP/techStackBackground.webp"
                alt="techstackpage-bg"
                className="absolute w-full h-full object-cover -z-10 inset-0 brightness-50"
            />
            <div className="flex flex-col max-w-7xl mx-auto">
                <h4
                    className="text-4xl text-blue-500 px-4 mb-10"
                    id="stack-mobile"
                >
                    Tech Stack
                </h4>

                <TechStack />
            </div>
        </div>
    );
};

export default TechGrid;
