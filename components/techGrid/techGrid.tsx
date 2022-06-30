import { Grid, Typography } from "@mui/material";
import TechStack from "../techStack/techStack";

const TechGrid: React.FC = () => {
    return (
        <Grid container className="techContainer" id="techStack">
            <Grid container className="techContainer__widthGrid">
                <img
                    src="webP/techStackBackground.webp"
                    alt="techstackpage-bg"
                    className="techContainer__image"
                />
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
