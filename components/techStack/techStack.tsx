import React from "react";
import { technologies } from "../../constants/technologies";
import TechItem from "../techItem/techItem";
import { motion } from "framer-motion";

const TechStack: React.FC = () => {
    return (
        <div
            className="flex flex-wrap gap-8 mt-8 max-w-6xl mx-auto items-center justify-center "
            data-testid="techItemGrid"
        >
            {technologies.map((el, ind) => (
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.3,
                        delay: Math.random() * 1.5 + 0.2,
                    }}
                    key={el.logo}
                    variants={{
                        visible: { opacity: 1, scale: 1 },
                        hidden: { opacity: 0, scale: 0 },
                    }}
                >
                    <TechItem logo={el.logo} name={el.name} key={el.logo} />
                </motion.div>
            ))}
        </div>
    );
};

export default TechStack;
