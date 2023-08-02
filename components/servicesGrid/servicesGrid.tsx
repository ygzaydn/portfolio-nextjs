import { services } from "../../constants/services";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";

import ServiceCard from "../serviceCard/serviceCard";

const ServicesGrid: React.FC = () => {
  return (
    <div
      className=" flex flex-col  max-w-7xl mx-auto px-5 py-10"
      id="servicesGrid"
    >
      <div className="mb-10">
        <h4 className="text-blue-400 text-4xl">Services</h4>
      </div>
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
