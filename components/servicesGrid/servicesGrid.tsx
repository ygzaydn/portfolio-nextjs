import { Grid, Typography } from "@mui/material";
import ServiceCard from "../serviceCard/serviceCard";

import { services } from "../../constants/services";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid as SwiperGrid } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";

const ServicesGrid: React.FC = () => {
    return (
        <Grid container className="overallGrid" id="servicesGrid">
            <Grid item xs={12}>
                <Typography color="primary" variant="h4">
                    Services
                </Typography>
            </Grid>
            <Grid container className="servicesGrid" data-testid="servicesGrid">
                <Swiper
                    spaceBetween={25}
                    slidesPerView={2}
                    grid={{
                        rows: 2,
                    }}
                    pagination={{
                        dynamicBullets: true,
                        clickable: true,
                    }}
                    scrollbar={{ draggable: true }}
                    modules={[SwiperGrid, Pagination]}
                >
                    {services.map((service) => (
                        <SwiperSlide>
                            <ServiceCard
                                logo={service.logo}
                                title={service.title}
                                description={service.description}
                                key={service.title}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Grid>
        </Grid>
    );
};

export default ServicesGrid;
