import { Grid, Typography } from "@mui/material";
import Form from "../contactForm/contactForm";

import styles from "../../styles/ContactGrid.module.scss";

const ContactGrid = () => {
    return (
        <Grid container className={styles.contactGrid}>
            <Grid item xs={12} className={styles.titleGrid}>
                <Typography variant="h4" style={{ margin: "4rem 0 2rem 0" }}>
                    Contact
                </Typography>
            </Grid>
            <Grid item xs={12} className={styles.formGrid}>
                <Form />
            </Grid>
        </Grid>
    );
};

export default ContactGrid;
