import Form from "../contactForm/contactForm";
import Title from "../title/title";
import { motion } from "framer-motion";

const ContactGrid: React.FC = () => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 2 }}
            variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 1 },
            }}
            className="group/stack flex flex-col max-w-7xl mx-auto px-16 my-16 bg-slate-100 py-6"
            id="contactGrid"
        >
            <Title title="Contact Form" color="blue" />
            <div className="max-w-80">
                <Form />
            </div>
        </motion.div>
    );
};

export default ContactGrid;
