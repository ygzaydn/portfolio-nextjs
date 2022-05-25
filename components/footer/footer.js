import { Grid, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import SendIcon from "@mui/icons-material/Send";

import styles from "../../styles/Footer.module.scss";

const Footer = () => {
    return (
        <Grid container className={styles.footer}>
            <Grid item xs={12} className={styles.socialGrid} id="socialIcon">
                <LinkedInIcon
                    onClick={() => {
                        window.open(
                            "https://tr.linkedin.com/in/erol-ya%C4%9F%C4%B1z-ayd%C4%B1n-208517a9"
                        );
                    }}
                />
                <GitHubIcon
                    onClick={() => {
                        window.open("https://github.com/ygzaydn");
                    }}
                />
                <TwitterIcon
                    onClick={() => {
                        window.open("https://twitter.com/aydnygz");
                    }}
                />
            </Grid>
            <Grid item xs={12} className={styles.mailGrid}>
                <Typography variant="h6">ygzaydns@gmail.com</Typography>
            </Grid>
        </Grid>
    );
};

export default Footer;
