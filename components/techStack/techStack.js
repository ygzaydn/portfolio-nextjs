import React from "react";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import { technologies } from "../../public/logo";
import styles from "../../styles/TechStack.module.scss";

const TechStack = () => {
    return (
        <Grid
            container
            justifyContent="center"
            display="flex"
            alignItems="center"
        >
            {technologies.map((el, ind) => (
                <Grid
                    item
                    xs={3}
                    md={2}
                    key={el.logo}
                    className={styles.logoGrid}
                >
                    <Image
                        height={75}
                        width={75}
                        src={
                            require(`../../public/logo/${el.logo}.svg`).default
                        }
                        alt={`${el.logo}`}
                        className={styles.logo}
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
