import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import dynamic from "next/dynamic";

import { services } from "../../constants/services";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid as SwiperGrid } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";

const ServiceCard = dynamic(() => import("../serviceCard/serviceCard"));

const ServicesGrid: React.FC = () => {
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                    slidesPerView={width > 1500 ? 4 : width > 750 ? 3 : 2}
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
                        <SwiperSlide key={service.title}>
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
