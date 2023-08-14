import { services } from "../../constants/services";

import ServiceCard from "../serviceCard/serviceCard";
import Title from "../title/title";
import { motion } from "framer-motion";

const ServicesGrid: React.FC = () => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 1 },
            }}
            className="group/stack flex flex-col pt-24 max-w-7xl mx-auto px-5 py-10 "
            id="servicesGrid"
        >
            <Title title="Services" color="blue" />
            <div
                className="grid grid-cols-3 gap-5 sm:grid-cols-2 mt-16 mb-24"
                data-testid="servicesGrid"
            >
                {services.map((service) => (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.3,
                            delay: Math.random() * 1 + 0.2,
                        }}
                        key={service.title}
                        variants={{
                            visible: { opacity: 1, scale: 1 },
                            hidden: { opacity: 0, scale: 1 },
                        }}
                    >
                        <ServiceCard
                            logo={service.logo}
                            title={service.title}
                            description={service.description}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ServicesGrid;
