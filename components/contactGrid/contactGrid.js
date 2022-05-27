import { Grid, Typography } from "@mui/material";
import Form from "../contactForm/contactForm";

const ContactGrid = () => {
    return (
        <Grid container className="contactGrid" id="contactGrid">
            <Grid item xs={12} className="contactGrid__titleGrid">
                <Typography variant="h4" style={{ margin: "4rem 0 2rem 0" }}>
                    Contact
                </Typography>
            </Grid>
            <Grid item xs={12} className="contactGrid__formGrid">
                <Form />
            </Grid>
        </Grid>
    );
};

export default ContactGrid;
