import React from "react";
import { technologies } from "../../constants/technologies";
import TechItem from "../techItem/techItem";

const TechStack: React.FC = () => {
    return (
        <div
            className="flex flex-wrap gap-8 mt-8 max-w-6xl mx-auto items-center justify-center "
            data-testid="techItemGrid"
        >
            {technologies.map((el) => (
                <TechItem logo={el.logo} name={el.name} key={el.logo} />
            ))}
        </div>
    );
};

export default TechStack;
