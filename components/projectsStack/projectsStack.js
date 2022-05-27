import { Grid, Typography } from "@mui/material";

import ProjectCard from "../projectCard/projectCard";

import ICCImage from "../../public/webP/icc.webp";
import RidenrateImage from "../../public/webP/ridenrate.webp";
import MellImage from "../../public/webP/mell.webp";
import LibrejournalImage from "../../public/webP/librejournal.webp";
import CrownImage from "../../public/webP/CrownImage.webp";
import GoldenLotusImage from "../../public/webP/goldenlotus.webp";
import TodoImage from "../../public/webP/todo.webp";
import SongRecommenderImage from "../../public/webP/song-recommender.webp";
import ArgbotImage from "../../public/webP/argbot.webp";
import IkinciElImage from "../../public/webP/ikincielproject.webp";

const ProjectsStack = () => {
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
            </Grid>
            <Grid container className="projectGrid">
                <ProjectCard
                    title="Argbot"
                    description="Argbot is a clone of a crypto bot website. The website is not connected with any backend service, purpose is to show example cases."
                    image={ArgbotImage.src}
                    tech="Javascript - Redux - React - SCSS- Firebase - Material UI"
                    note="You can login with any id/password combination to check overall system."
                    link="https://argbotxyz.web.app"
                    size="huge"
                />
                <ProjectCard
                    title="Ikinci El Project"
                    description="İkinci el project is a platform to buy and sell products that've been used before."
                    image={IkinciElImage.src}
                    tech="Javascript - Redux - React - SCSS"
                    note="Please create an accout for yourself to surf around the platform - it's free to register!"
                    link="https://ikincielproject.web.app"
                    size="big"
                />

                <ProjectCard
                    title="Golden Lotus Boost Community"
                    description="Golden Lotus boost community is one of the largest EU gold boost communities in video game World of Warcraft (WoW), housing some of the best players & guilds in the world "
                    image={GoldenLotusImage.src}
                    tech="Javascript - React - Firebase - Material UI"
                    link="https://goldenlotus-website.web.app/"
                />

                <ProjectCard
                    title="Icecrown Boost Community"
                    description="Icecrown boost community is one of the largest EU gold boost communities in video game World of Warcraft (WoW), housing some of the best players & guilds in the world "
                    image={ICCImage.src}
                    tech="Javascript - React - Firebase - Material UI - Node.js"
                    link="https://icc-website-dc881.web.app"
                    size="long"
                />
                <ProjectCard
                    title="Librejournal"
                    description="Librejournal is a social media platform for local journalists. You can easily share stories about the events around you to react people. "
                    image={LibrejournalImage.src}
                    tech="Javascript - React - Redux - MongoDB - Material UI - Node.js"
                    note=" Project is run on heroku, so it may not be loaded at first try, if this happens, please try to refresh page."
                    link="http://librejournal-fe.herokuapp.com/"
                />

                <ProjectCard
                    title="Crown Clothing"
                    description="Crown Clothing is a mimic of e-commerce website that is completely build on React."
                    image={CrownImage.src}
                    tech="Javascript -React - Firebase - Redux - Sass"
                    note=" Project is run on heroku, so it may not be loaded at first try, if this happens, please try to refresh page."
                    link="https://crown-clothing-fe.herokuapp.com/"
                />
                <ProjectCard
                    title="Mell Beauty Center"
                    description="Mell Beauty Center is a beauty center that located at İzmir / Turkey. This is the official website for the business."
                    image={MellImage.src}
                    tech="Javascript - React - Firebase - Material UI"
                    link="https://mellguzellikmerkezi.com/"
                    size="big"
                />
                <ProjectCard
                    title="Ride'n'Rate"
                    description="Ride'n'Rate is a platform for users to evaluate their trips. Users can check those evaluations & ratings for future trips to have a better time on travel."
                    image={RidenrateImage.src}
                    tech="Javascript - HTML - CSS"
                    note=" Project is run on heroku, so it may not be loaded at first try, if this happens, please try to refresh page."
                    link="http://ridenrate.herokuapp.com/"
                />
                <ProjectCard
                    title="Song Recommender"
                    description="Song recommender is a website to help you find similar songs based on your search. This project is powered by Last.fm API."
                    image={SongRecommenderImage.src}
                    tech="Javascript - Redux - React - SCSS- Firebase - Material UI"
                    link="https://song-recommender-001.web.app/"
                    size="big"
                />
                <ProjectCard
                    title="Todo app"
                    description="Simple todo app that build with the help of typescript, redux and saas."
                    image={TodoImage.src}
                    tech="Redux - Typescript - Sass"
                    link="https://ygzaydn.github.io/todo"
                />
            </Grid>
        </Grid>
    );
};

export default ProjectsStack;
