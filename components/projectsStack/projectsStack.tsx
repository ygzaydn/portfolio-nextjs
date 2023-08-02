import { Grid, Typography } from "@mui/material";

import ProjectCard from "../projectCard/projectCard";

import React from "react";
import { projects } from "../../constants/projects";

const ProjectsStack: React.FC = () => {
  return (
    <div
      className="flex flex-col max-w-7xl mx-auto px-8 mb-16"
      id="projectsGrid"
    >
      <div className="flex flex-col mb-8">
        <h4 className="text-blue-400 text-4xl">Projects</h4>
        <h6 className="mt-4 text-lg">
          Some projects that I've worked are listed below. You can click images
          to get more information.
        </h6>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-2">
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
