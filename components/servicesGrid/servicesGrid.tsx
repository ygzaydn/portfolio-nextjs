import { Grid, Typography } from "@mui/material";
import ServiceCard from "../serviceCard/serviceCard";

import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import CodeIcon from "@mui/icons-material/Code";
import ColorizeIcon from "@mui/icons-material/Colorize";
import ApiIcon from "@mui/icons-material/Api";
import StorageIcon from "@mui/icons-material/Storage";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import PolicyIcon from "@mui/icons-material/Policy";

const ServicesGrid: React.FC = () => {
    return (
        <Grid container className="overallGrid" id="servicesGrid">
            <Grid item xs={12}>
                <Typography color="primary" variant="h4">
                    Services
                </Typography>
            </Grid>
            <Grid container className="servicesGrid">
                <ServiceCard
                    logo={<CodeIcon />}
                    title={"Web Apps"}
                    description={
                        "I develop dedicated software and applications with an efficient and functional front-end library - React."
                    }
                />
                <ServiceCard
                    logo={<DeveloperModeIcon />}
                    title={"Responsive Design"}
                    description={
                        "I develop web-apps in responsive manner. Productions that I've created are responsive for different devices."
                    }
                />
                <ServiceCard
                    logo={<ColorizeIcon />}
                    title={"UI/UX Development"}
                    description={
                        "I develop cutting-edge wireframes for your needs."
                    }
                />
                <ServiceCard
                    logo={<ApiIcon />}
                    title={"API Integration"}
                    description={"I integrate APIs for your applicaton."}
                />
                <ServiceCard
                    logo={<StorageIcon />}
                    title={"Server Side Rendering"}
                    description={
                        "Based on your needs, I render your application on server or client."
                    }
                />
                <ServiceCard
                    logo={<TravelExploreIcon />}
                    title={"SEO Optimization"}
                    description={
                        "I optimize your application for search engines."
                    }
                />
                <ServiceCard
                    logo={<PolicyIcon />}
                    title={"Security"}
                    description={
                        "I develop 100% secured applications, no one can harm you."
                    }
                />
            </Grid>
        </Grid>
    );
};

export default ServicesGrid;
