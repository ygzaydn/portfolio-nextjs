import { Grid, Typography } from "@mui/material";

import ProjectCard from "../projectCard/projectCard";

import React from "react";
import { projects } from "../../constants/projects";

const ProjectsStack: React.FC = () => {
    return (
        <Grid container className="projectsContainer" id="projectsGrid">
            <Grid item xs={12} className="marginBottom">
                <Typography
                    color="primary"
                    variant="h4"
                    className="projectsContainer__title"
                >
                    Projects
                </Typography>
                <Typography
                    variant="h6"
                    className="projectsContainer__titleSub"
                >
                    Projects that I've developed are listed below, you can click
                    images to get details.
                </Typography>
            </Grid>
            <Grid container className="projectGrid">
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
            </Grid>
        </Grid>
    );
};

export default ProjectsStack;
