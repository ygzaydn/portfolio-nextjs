import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
} from "@mui/material";

import Firebase from "../../utils/firebase";

import { v4 as uuidv4 } from "uuid";

const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    message: yup.string("Enter your message").required("Message is required"),
});

const Form = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            message: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const id = uuidv4();
            const data = { email: values.email, message: values.message };
            const firebase = new Firebase();

            const res = await firebase.doPushNewMessage(id, data);
            if (res) {
                handleClickOpen();
            }
        },
    });

    const handleSubmit = () => {};

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="formGrid">
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email*"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    className="formGrid__input"
                    autoComplete="off"
                />
                <TextField
                    fullWidth
                    id="message"
                    name="message"
                    label="Message*"
                    type="text"
                    multiline
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    autoComplete="off"
                    error={
                        formik.touched.message && Boolean(formik.errors.message)
                    }
                    helperText={formik.touched.message && formik.errors.message}
                    className={"formGrid__input" + " " + "formGrid__message"}
                />
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    className="formGrid__button"
                >
                    Submit
                </Button>
            </form>
            <Dialog
                open={open}
                onClose={handleClose}
                className="formGrid__dialogBox"
            >
                <DialogTitle
                    style={{ cursor: "move" }}
                    id="draggable-dialog-title"
                >
                    <Typography color="primary" variant="h6">
                        Successful
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="subtitle1">
                            I have received your message, you will get an e-mail
                            as a response.
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Form;
