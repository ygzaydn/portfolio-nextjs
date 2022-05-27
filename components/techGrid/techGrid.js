import { Grid, Typography } from "@mui/material";
import TechStack from "../techStack/techStack";
import TechStackBackground from "../../public/webP/techStackBackground.webp";

const TechGrid = () => {
    return (
        <Grid
            container
            className="techContainer"
            id="techStack"
            style={{
                background: ` linear-gradient(#000000D1,#000000D1),url(${TechStackBackground.src})`,
                backgroundSize: "cover",
            }}
        >
            <Grid container className="techContainer__widthGrid">
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

export default TechGrid;
