import TechStack from "../techStack/techStack";

const TechGrid: React.FC = () => {
  return (
    <div
      className="relative pt-16 pb-32 px-10"
      style={{
        clipPath:
          "polygon(0% 0%, 100% 0%, 100% 90%, 60% 90%, 50% 100%, 40% 90%, 0% 90%)",
      }}
      id="techStack"
    >
      <img
        src="webP/techStackBackground.webp"
        alt="techstackpage-bg"
        className="techContainer__image"
      />
      <div className="flex flex-col">
        <h4 className="text-4xl text-blue-500 px-4 mb-10" id="stack-mobile">
          Tech Stack
        </h4>

        <TechStack />
      </div>
    </div>
  );
};

export default TechGrid;
