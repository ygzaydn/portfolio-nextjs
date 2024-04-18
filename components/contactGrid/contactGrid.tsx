import Form from "../contactForm/contactForm";
import Title from "../title/title";
import { motion } from "framer-motion";

const ContactGrid: React.FC = () => {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			transition={{ duration: 0.3, delay: 1 }}
			variants={{
				visible: { opacity: 1, scale: 1 },
				hidden: { opacity: 0, scale: 1 },
			}}
			className="group/stack relative flex flex-col max-w-7xl mx-auto px-16 my-36 bg-slate-100 py-6 rounded-xl ring-2 ring-blue-800 border-2 sm:overflow-x-hidden w-2/3"
			id="contactGrid"
		>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				transition={{ duration: 1, delay: 1.5 }}
				variants={{
					visible: { opacity: 1, scale: 1 },
					hidden: { opacity: 0, scale: 1 },
				}}
				className="absolute max-w-7xl w-full h-full bg-blue-800 -z-10 rounded-xl inset-0 !rotate-3 !scale-105"
				id="contactGrid"
			/>
			<Title title="Contact Form" color="blue" />
			<div className="max-w-80">
				<Form />
			</div>
		</motion.div>
	);
};

export default ContactGrid;
