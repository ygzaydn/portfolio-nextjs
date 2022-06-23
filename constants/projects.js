import RidenrateGif from "../public/gifs/ridenrate.webp";
import MellGif from "../public/gifs/mell.webp";
import LibrejournalGif from "../public/gifs/librejournal.webp";
import CrownGif from "../public/gifs/crown.webp";
import GoldenLotusGif from "../public/gifs/goldenlotus.webp";
import SongRecommenderGif from "../public/gifs/song-recommender.webp";
import ArgbotGif from "../public/gifs/argbot.webp";
import IkinciElGif from "../public/gifs/ikinciel.webp";

import RidenrateImage from "../public/webP/ridenrate.webp";
import MellImage from "../public/webP/mell.webp";
import LibrejournalImage from "../public/webP/librejournal.webp";
import CrownImage from "../public/webP/CrownImage.webp";
import GoldenLotusImage from "../public/webP/goldenlotus.webp";
import SongRecommenderImage from "../public/webP/song-recommender.webp";
import ArgbotImage from "../public/webP/argbot.webp";
import IkinciElImage from "../public/webP/ikincielproject.webp";

export const projects = [
    {
        title: "Argbot",
        description:
            "Argbot is a clone of a crypto bot website. The website is not connected with any backend service, purpose is to show example cases.",
        image: ArgbotImage,
        gif: ArgbotGif,
        tech: "Javascript - Redux - React - SCSS- Firebase - Material UI",
        note: "You can login with any id/password combination to check overall system.",
        link: "https://argbotxyz.web.app",
        size: "huge",
    },
    {
        title: "Ikinci El Project",
        description:
            "İkinci el project is a platform to buy and sell products that've been used before.",
        image: IkinciElImage,
        gif: IkinciElGif,
        tech: "Javascript - Redux - React - SCSS",
        note: "Please create an accout for yourself to surf around the platform - it's free to register!",
        link: "https://ikincielproject.web.app",
        size: "big",
    },
    {
        title: "Golden Lotus Boost Community",
        description:
            "Golden Lotus boost community is one of the largest EU gold boost communities in video game World of Warcraft (WoW), housing some of the best players & guilds in the world.",
        image: GoldenLotusImage,
        gif: GoldenLotusGif,
        tech: "Javascript - React - Firebase - Material UI",
        note: null,
        link: "https://goldenlotus-website.web.app/",
        size: null,
    },
    {
        title: "Librejournal",
        description:
            "Librejournal is a social media platform for local journalists. You can easily share stories about the events around you to react people.",
        image: LibrejournalImage,
        gif: LibrejournalGif,
        tech: "Javascript - React - Redux - MongoDB - Material UI - Node.js",
        note: "Project runs on heroku, so it may not be loaded at first try, if this happens, please try to refresh page.",
        link: "http://librejournal-fe.herokuapp.com/",
        size: null,
    },
    {
        title: "Crown Clothing",
        description:
            "Crown Clothing is a mimic of e-commerce website that is completely build on React.",
        image: CrownImage,
        gif: CrownGif,
        tech: "Javascript -React - Firebase - Redux - SCSS",
        note: "Project runs on heroku, so it may not be loaded at first try, if this happens, please try to refresh page.",
        link: "https://crown-clothing-fe.herokuapp.com/",
        size: null,
    },
    {
        title: "Mell Beauty Center",
        description:
            "Mell Beauty Center is a beauty center that located at İzmir / Turkey. This is the official website for the business.",
        image: MellImage,
        gif: MellGif,
        tech: "Javascript - React - Firebase - Material UI",
        note: "Project runs on heroku, so it may not be loaded at first try, if this happens, please try to refresh page.",
        link: "https://mellguzellikmerkezi.com/",
        size: "big",
    },
    {
        title: "Ride'n'Rate",
        description:
            "Ride'n'Rate is a platform for users to evaluate their trips. Users can check those evaluations & ratings for future trips to have a better time on travel.",
        image: RidenrateImage,
        gif: RidenrateGif,
        tech: "Javascript - HTML - CSS",
        note: "Project runs on heroku, so it may not be loaded at first try, if this happens, please try to refresh page.",
        link: "http://ridenrate.herokuapp.com/",
        size: null,
    },
    {
        title: "Song Recommender",
        description:
            "Song recommender is a website to help you find similar songs based on your search. This project is powered by Last.fm API.",
        image: SongRecommenderImage,
        gif: SongRecommenderGif,
        tech: "Javascript - Redux - React - SCSS- Firebase - Material UI",
        note: null,
        link: "https://song-recommender-001.web.app/",
        size: "big",
    },
];
