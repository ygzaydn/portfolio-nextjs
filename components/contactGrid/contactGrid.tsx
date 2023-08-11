import Form from "../contactForm/contactForm";
import Title from "../title/title";

const ContactGrid: React.FC = () => {
    return (
        <div
            className="group/stack flex flex-col max-w-7xl mx-auto px-16 my-16 bg-slate-100 py-6"
            id="contactGrid"
        >
            <Title title="Contact Form" color="blue" />
            <div className="max-w-80">
                <Form />
            </div>
        </div>
    );
};

export default ContactGrid;
