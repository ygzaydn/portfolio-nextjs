import { Grid, Typography } from "@mui/material";
import ServiceCard from "../serviceCard/serviceCard";

import { services } from "../../constants/services";

const ServicesGrid: React.FC = () => {
    return (
        <Grid container className="overallGrid" id="servicesGrid">
            <Grid item xs={12}>
                <Typography color="primary" variant="h4">
                    Services
                </Typography>
            </Grid>
            <Grid container className="servicesGrid" data-testid="servicesGrid">
                {services.map((service) => (
                    <ServiceCard
                        logo={service.logo}
                        title={service.title}
                        description={service.description}
                        key={service.title}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default ServicesGrid;
