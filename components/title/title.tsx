import { Lilita_One } from "next/font/google";

const rajdhani = Lilita_One({ subsets: ["latin"], weight: ["400"] });

interface ITitle {
    title: string;
    color: "white" | "blue";
}

const Title = ({ title, color }: ITitle) => {
    return (
        <div className={` mb-10 relative z-10 ${rajdhani.className}`}>
            <h4
                className={`${
                    color === "white" ? "text-slate-50" : "text-blue-800"
                } tracking-wide text-5xl before:content-[''] before:bottom-0 before:w-1/4 sm:before:w-3/4 before:absolute before:h-2 before:bg-blue-200/60 before:-rotate-3 before:-left-6 before:-z-10 z-20 before:rounded-md before:overflow-hidden group-hover/stack:tracking-widest transition-all`}
            >
                {title}
            </h4>
        </div>
    );
};

export default Title;
