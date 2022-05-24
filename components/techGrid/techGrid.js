import { Grid, Typography } from "@mui/material";
import TechStack from "../techStack/techStack";
import styles from "../../styles/TechGrid.module.scss";
import TechStackBackground from "../../public/techStackBackground.jpg";

const TechGrid = () => {
    return (
        <Grid
            container
            className={styles.techContainer}
            id="stack-desktop"
            style={{
                background: ` linear-gradient(#000000D1,#000000D1),url(${TechStackBackground.src})`,
                backgroundSize: "cover",
            }}
        >
            <Grid container className={styles.widthGrid}>
                <Grid
                    item
                    xs={12}
                    style={{ marginBottom: "5%" }}
                    id="stack-mobile"
                >
                    <Typography
                        color="primary"
                        variant="h4"
                        style={{
                            textAlign: "start",
                            paddingLeft: "2rem",
                        }}
                    >
                        Tech Stack
                    </Typography>
                </Grid>

                <TechStack />
            </Grid>
        </Grid>
    );
};
/*        background: ` linear-gradient(#000000D1,#000000D1),url(${BackgroundImageTech})`,
 */
export default TechGrid;
