/*import RidenrateGif from "../public/gifs/ridenrate.webp";
import MellGif from "../public/gifs/mell.webp";
import LibrejournalGif from "../public/gifs/librejournal.webp";
import CrownGif from "../public/gifs/crown.webp";
import GoldenLotusGif from "../public/gifs/goldenlotus.webp";
import SongRecommenderGif from "../public/gifs/song-recommender.webp";
import ArgbotGif from "../public/gifs/argbot.webp";
import IkinciElGif from "../public/gifs/ikinciel.webp";
import SenozGif from "../public/gifs/senoz.webp";

import RidenrateImage from "../public/webP/ridenrate.webp";
import MellImage from "../public/webP/mell.webp";
import LibrejournalImage from "../public/webP/librejournal.webp";
import CrownImage from "../public/webP/CrownImage.webp";
import GoldenLotusImage from "../public/webP/goldenlotus.webp";
import SongRecommenderImage from "../public/webP/song-recommender.webp";
import ArgbotImage from "../public/webP/argbot.webp";
import IkinciElImage from "../public/webP/ikincielproject.webp";
import SenozImage from "../public/webP/senoz.webp";*/

export const projects = [
	{
		title: "Carbon Up",
		description:
			"Carbon Up is an SaaS that aims to track carbon footprint of the companies. It provides various metrics and help users to track their source waste. Also it has an smart AI system that track down the bills and verifies the results with provided records.",
		image: "carbonup",
		note: null,
		// gif: ArgbotGif,
		tech: "Next, MongoDB",
		link: "https://www.carbon-up.com",
	},
	{
		title: "ZSS AI",
		description:
			"Zero software solutions is a company that provides AI based solutions for various sectors.",
		image: "zssai",
		note: null,
		// gif: ArgbotGif,
		tech: "Next, MongoDB, Tailwind",
		link: "https://www.zss.ai",
	},
	// {
	// 	title: "Globe VPN",
	// 	description:
	// 		"Globe VPN is an IPSec VPN with cutting edge features. Currently available in android.",
	// 	image: "globevpn",
	// 	note: null,
	// 	// gif: ArgbotGif,
	// 	tech: "React Native",
	// 	link: "https://www.globevpn.net/",
	// },
	{
		title: "DNSWatcher",
		description:
			"DNSWatcher is a cross-platform DNS monitoring tool written in Go. It captures and analyzes DNS traffic in real time, tracks key performance indicators (KPIs), and provides both a command-line and a desktop GUI for visualization.",
		image: "dnswatcher",
		note: null,
		tech: "Golang - Fyne",
		link: "https://github.com/ygzaydn/go-dnswatcher",
	},
	{
		title: "SustaiMedAI",
		description:
			"SustaiMedAI is a modern, AI-powered web application designed to help users track their meals, water consumption, carbon footprint, and overall nutrition. Built with Next.js, Chakra UI, and Redux Toolkit, it provides a seamless and interactive experience for healthy and sustainable living. ",
		image: "sustaimedai",
		note: "Note: This project is developed for academic purposes and utilizes official, reputable data sources for nutritional and environmental information.",
		tech: "Next.js - Chakra UI - Redux Toolkit",
		link: "https://appfoodie.netlify.app/",
	},
	{
		title: "Coxipay",
		description:
			"Coxipay is Lithuania base company, focused on safe, smart and multifunctional system which provides a full One Stop Payment Solutions for client’s needs! I have developed agent panel for the company. ",
		image: "coxi",
		note: null,
		// gif: ArgbotGif,
		tech: "Javascript - Redux - React - TailwindCSS",
		link: "https://www.coxipay.com/",
	},
	{
		title: "MMOGadget",
		description:
			"MMOGadget is a platform to help users to find their new MMO game. This project is developed by a gaming community which they don't want to be mentioned. So I've published a previous version of the project.",
		image: "mmogadget",
		//gif: IkinciElGif,
		tech: "Typescripty - Redux - Next - SCSS",
		link: "https://mmogadget.vercel.app/",
		size: null,
	},
	{
		title: "LoA Companion",
		description:
			"LoA Companion is an app to help players who plays Lost Ark.",
		image: "loa-companion",
		note: null,
		// gif: ArgbotGif,
		tech: "React Native",
		link: "https://play.google.com/store/apps/details?id=com.loacompanion",
	},
	{
		title: "Cargopanel",
		description:
			"Cargopanel, which aims to digitize international logistics services and is one of the leading brands in Turkey with its entrepreneur-friendly solutions it offers, is a technology-centered logistics company that came to life after a group of friends discussed various problems in the field of international logistics and then laid the foundations of a team of experts in the field.",
		image: "cargopanel",
		note: null,
		// gif: ArgbotGif,
		tech: "Nextjs, Material UI",
		link: "https://www.cargopanel.co/",
	},
	/*     {
        title: "Ikinci El Project",
        description:
            "İkinci el project is a platform to buy and sell products that've been used before.",
        image: "ikincielproject",
        //gif: IkinciElGif,
        tech: "Javascript - Redux - React - SCSS",
        note: "Please create an accout for yourself to surf around the platform - it's free to register!",
        link: "https://ikincielproject.web.app",
        size: null,
    }, */
	{
		title: "Golden Lotus Boost Community",
		description:
			"Golden Lotus boost community is one of the largest EU gold boost communities in video game World of Warcraft (WoW), housing some of the best players & guilds in the world.",
		image: "goldenlotus",
		//gif: GoldenLotusGif,
		tech: "Javascript - React - Firebase - Material UI",
		note: null,
		link: "https://goldenlotus-website.web.app/",
		size: null,
	},

	/*     {
        title: "Librejournal",
        description:
            "Librejournal is a social media platform for local journalists. You can easily share stories about the events around you to react people.",
        image: "librejournal",
        //gif: LibrejournalGif,
        tech: "Javascript - React - Redux - MongoDB - Material UI - Node.js",
        note: "Project runs on heroku, so it may not be loaded at first try, if this happens, please try to refresh page.",
        link: "http://librejournal-fe.herokuapp.com/",
        size: null,
    }, */
	{
		title: "Song Recommender",
		description:
			"Song recommender is a website to help you find similar songs based on your search. This project is powered by Last.fm API.",
		image: "song-recommender",
		//gif: SongRecommenderGif,
		tech: "Javascript - Redux - React - SCSS- Firebase - Material UI",
		note: null,
		link: "https://song-recommender-001.web.app/",
		size: null,
	},
	{
		title: "F1 Wiki",
		description:
			"F1 is an app to help players who loves Formula 1. It contains all information for all formula seasons (from 1950 to 2023)",
		image: "f1-wiki",
		note: null,
		// gif: ArgbotGif,
		tech: "React Native",
		link: "https://play.google.com/store/apps/details?id=com.f1wiki",
	},
	{
		title: "Argbot",
		description:
			"Argbot is a clone of a crypto bot website. The website is not connected with any backend service, purpose is to show example cases.",
		image: "argbot",
		// gif: ArgbotGif,
		tech: "Javascript - Redux - React - SCSS- Firebase - Material UI",
		note: "You can login with any id/password combination to check overall system.",
		link: "https://argbotxyz.web.app",
	},
	/*     {
        title: "Crown Clothing",
        description:
            "Crown Clothing is a mimic of e-commerce website that is completely build on React.",
        image: "CrownImage",
        //gif: CrownGif,
        tech: "Javascript -React - Firebase - Redux - SCSS",
        note: "Project runs on heroku, so it may not be loaded at first try, if this happens, please try to refresh page.",
        link: "https://crown-clothing-fe.herokuapp.com/",
        size: null,
    }, */
	{
		title: "Senoz Mobilya",
		description:
			"Senoz Furniture is a company based on Istanbul. It provides furniture for its clients.",
		image: "senoz",
		//gif: SenozGif,
		tech: "Javascript - React - Redux - Material UI",
		note: null,
		link: "https://www.senozmobilya.com/",
	},

	/*     {
        title: "Mell Beauty Center",
        description:
            "Mell Beauty Center is a beauty center that located at İzmir / Turkey. This is the official website for the business.",
        image: "mell",
        //gif: MellGif,
        tech: "Javascript - React - Firebase - Material UI",
        note: "Project runs on heroku, so it may not be loaded at first try, if this happens, please try to refresh page.",
        link: "https://mellguzellikmerkezi.com/",
        size: null,
    }, */
	/*     {
        title: "Ride'n'Rate",
        description:
            "Ride'n'Rate is a platform for users to evaluate their trips. Users can check those evaluations & ratings for future trips to have a better time on travel.",
        image: "ridenrate",
        //gif: RidenrateGif,
        tech: "Javascript - HTML - CSS",
        note: "Project runs on heroku, so it may not be loaded at first try, if this happens, please try to refresh page.",
        link: "http://ridenrate.herokuapp.com/",
        size: null,
    }, */
];
