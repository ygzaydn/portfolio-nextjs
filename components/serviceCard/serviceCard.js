import React from "react";

import { Grid, Typography } from "@mui/material";
import styles from "../../styles/ServiceCard.module.scss";

const ServiceCard = ({ title, description, logo }) => {
    return (
        <Grid item className={styles.serviceCardGrid} key={title}>
            <Grid item xs={12} className={styles.logoGrid}>
                {logo}
            </Grid>
            <Typography
                variant="h6"
                textAlign="center"
                className={styles.titleGrid}
            >
                {title}
            </Typography>
            <Typography
                variant="subtitle2"
                fontWeight="light"
                textAlign="center"
                className={styles.descriptionGrid}
            >
                {description}
            </Typography>
        </Grid>
    );
};

export default ServiceCard;
