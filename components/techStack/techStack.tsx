import React from "react";
import { Grid } from "@mui/material";
import { technologies } from "../../public/logo";
import TechItem from "../techItem/techItem";

const TechStack: React.FC = () => {
    return (
        <Grid
            container
            justifyContent="center"
            display="flex"
            alignItems="center"
            data-testid="techItemGrid"
        >
            {technologies.map((el) => (
                <TechItem logo={el.logo} name={el.name} key={el.logo} />
            ))}
        </Grid>
    );
};

export default TechStack;
