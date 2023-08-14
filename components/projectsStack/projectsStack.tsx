import ProjectCard from "../projectCard/projectCard";

import React from "react";
import { projects } from "../../constants/projects";
import Title from "../title/title";
import { motion } from "framer-motion";

const ProjectsStack: React.FC = () => {
    return (
        <div
            className="group/stack flex flex-col max-w-7xl mx-auto px-8 mb-16 my-16"
            id="projectsGrid"
        >
            <motion.div
                className="flex flex-col mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                variants={{
                    visible: { opacity: 1, scale: 1 },
                    hidden: { opacity: 0, scale: 1 },
                }}
            >
                <Title title="Projects" color="blue" />{" "}
                <h6 className="mt-4 text-lg">
                    Some projects that I've worked are listed below. You can
                    click images to get more information.
                </h6>
            </motion.div>
            <div className="grid grid-cols-5 sm:grid-cols-2">
                {projects.map((project) => (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.3,
                            delay: Math.random() * 1.5 + 0.2,
                        }}
                        key={project.title}
                        variants={{
                            visible: { opacity: 1, scale: 1 },
                            hidden: { opacity: 0, scale: 0 },
                        }}
                    >
                        <ProjectCard
                            title={project.title}
                            description={project.description}
                            image={project.image}
                            tech={project.tech}
                            note={project?.note && project.note}
                            link={project.link}
                            size={project?.size && project.size}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsStack;
