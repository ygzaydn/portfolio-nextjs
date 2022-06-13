import React from "react";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import { technologies } from "../../public/logo";

const TechStack: React.FC = () => {
    return (
        <Grid
            container
            justifyContent="center"
            display="flex"
            alignItems="center"
        >
            {technologies.map((el, ind) => (
                <Grid item xs={2} key={el.logo} className="techStack__logoGrid">
                    <Image
                        height={75}
                        width={75}
                        src={
                            require(`../../public/logo/${el.logo}.svg`).default
                        }
                        alt={`${el.logo}`}
                        className="techStack__logo"
                    />
                    <Typography variant="h6" color="primary">
                        {el.name}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );
};

export default TechStack;
