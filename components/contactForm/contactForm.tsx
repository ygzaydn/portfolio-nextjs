import React, { useState } from "react";
import { useFormik, Field, FormikProvider } from "formik";
import * as yup from "yup";
import { Dialog, DialogContent, DialogActions } from "@mui/material";

import Firebase from "../../utils/firebase";

import { v4 as uuidv4 } from "uuid";

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    message: yup.string().required("Message is required"),
});

const Form: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
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

    return (
        <div>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} className="flex flex-col">
                    <Field
                        id="email"
                        name="email"
                        as="input"
                        placeholder="Your email"
                        label="Email*"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        className="border-2 border-white my-5 py-2 px-4 focus-visible:border-blue-400 focus-visible:outline-none focus-visible:border-2 transition-all"
                        autoComplete="off"
                    />
                    <Field
                        id="message"
                        name="message"
                        as="textarea"
                        placeholder="Your message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        autoComplete="off"
                        error={
                            formik.touched.message &&
                            Boolean(formik.errors.message)
                        }
                        helperText={
                            formik.touched.message && formik.errors.message
                        }
                        className="border-2 border-white my-5 py-2 px-4 focus-visible:border-blue-400 focus-visible:outline-none focus-visible:border-2 transition-all"
                    />
                    <button
                        className="bg-blue-400 my-5 text-xl px-10 py-2 ml-auto rounded-md font-semibold text-slate-50 hover:bg-blue-500 transition-all"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    className="formGrid__dialogBox"
                >
                    <p className="text-lg text-blue-600">Successful</p>

                    <DialogContent>
                        <p className="text-md my-8">
                            I have received your message, you will get an e-mail
                            as a response.
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <button
                            onClick={handleClose}
                            className="bg-blue-400 my-5 px-6 py-5 rounded-md font-semibold text-slate-50 hover:bg-blue-500 transition-all"
                        >
                            Close
                        </button>
                    </DialogActions>
                </Dialog>
            </FormikProvider>
        </div>
    );
};

export default Form;
