import { services } from "../../constants/services";

import ServiceCard from "../serviceCard/serviceCard";
import Title from "../title/title";

const ServicesGrid: React.FC = () => {
    return (
        <div
            className="group/stack flex flex-col pt-24 max-w-7xl mx-auto px-5 py-10"
            id="servicesGrid"
        >
            <Title title="Services" color="blue" />
            <div
                className="grid grid-cols-3 gap-5 md:grid-cols-2"
                data-testid="servicesGrid"
            >
                {services.map((service) => (
                    <ServiceCard
                        logo={service.logo}
                        title={service.title}
                        description={service.description}
                        key={service.title}
                    />
                ))}
            </div>
        </div>
    );
};

export default ServicesGrid;
