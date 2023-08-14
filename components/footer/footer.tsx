import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer: React.FC = () => {
    return (
        <div className="flex flex-col my-6 mb-12">
            <div
                className="flex mx-auto gap-3"
                id="socialIcon"
                data-testid="footerGrid"
            >
                <LinkedInIcon
                    className="cursor-pointer transition hover:text-blue-400"
                    onClick={() => {
                        window.open(
                            "https://tr.linkedin.com/in/erol-ya%C4%9F%C4%B1z-ayd%C4%B1n-208517a9"
                        );
                    }}
                />
                <GitHubIcon
                    className="cursor-pointer transition hover:text-blue-400"
                    onClick={() => {
                        window.open("https://github.com/ygzaydn");
                    }}
                />
                <TwitterIcon
                    className="cursor-pointer transition hover:text-blue-400"
                    onClick={() => {
                        window.open("https://twitter.com/aydnygz");
                    }}
                />
            </div>

            <h6 className="text-md text-center text-black mt-2">
                ygzaydns@gmail.com
            </h6>
        </div>
    );
};

export default Footer;
