import { Grid } from "@mui/material";
import Form from "../contactForm/contactForm";

const ContactGrid: React.FC = () => {
  return (
    <div
      className="flex flex-col max-w-7xl mx-auto px-8 mb-16 bg-slate-100"
      id="contactGrid"
    >
      <h4
        className="text-blue-400 pl-8 text-4xl"
        style={{ margin: "4rem 0 2rem 0" }}
      >
        Contact Form
      </h4>
      <div className="max-w-80">
        <Form />
      </div>
    </div>
  );
};

export default ContactGrid;
