import { Grid, Typography } from "@mui/material";

import ProjectCard from "../projectCard/projectCard";

import React from "react";
import { projects } from "../../constants/projects";
import Title from "../title/title";

const ProjectsStack: React.FC = () => {
    return (
        <div
            className="group/stack flex flex-col max-w-7xl mx-auto px-8 mb-16"
            id="projectsGrid"
        >
            <div className="flex flex-col mb-8">
                <Title title="Projects" color="blue" />{" "}
                <h6 className="mt-4 text-lg">
                    Some projects that I've worked are listed below. You can
                    click images to get more information.
                </h6>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-2">
                {projects.map((project) => (
                    <ProjectCard
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        tech={project.tech}
                        note={project?.note && project.note}
                        link={project.link}
                        size={project?.size && project.size}
                        key={project.title}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectsStack;
