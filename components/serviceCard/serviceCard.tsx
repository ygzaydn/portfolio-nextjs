import React, { ReactNode } from "react";

import { Grid, Typography } from "@mui/material";

interface ServiceCardProps {
    title: string;
    description: string;
    logo: ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    description,
    logo,
}) => {
    return (
        <Grid
            item
            className="serviceCardGrid"
            key={title}
            data-testid="serviceCardGrid"
        >
            <Grid
                item
                xs={12}
                className="serviceCardGrid__logoGrid"
                data-testid="serviceCardGrid-logo"
            >
                {logo}
            </Grid>
            <Grid
                item
                xs={12}
                className="serviceCardGrid__titleGrid"
                data-testid="serviceCardGrid-title"
            >
                <Typography variant="h6" textAlign="center">
                    {title}
                </Typography>
            </Grid>

            <Grid
                item
                xs={12}
                className="serviceCardGrid__descriptionGrid"
                data-testid="serviceCardGrid-description"
            >
                <Typography
                    variant="subtitle2"
                    fontWeight="light"
                    textAlign="center"
                >
                    {description}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ServiceCard;
