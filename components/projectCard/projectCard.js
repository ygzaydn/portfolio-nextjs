import React, { useState } from "react";

import {
    Grid,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Button,
    Card,
    CardMedia,
} from "@mui/material";

import styles from "../../styles/ProjectCard.module.scss";

const ProjectCard = ({
    title,
    description,
    image,
    tech,
    link,
    note,
    limit,
    width,
}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={styles.gridSize}>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <Typography
                        color="primary"
                        variant="h4"
                        style={{
                            textAlign: "center",
                            padding: "1rem 2rem",
                            borderBottom: "0.1px lightgray solid",
                        }}
                    >
                        {title}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container className={styles.dialogContainer}>
                        <Grid item xs={12} className={styles.dialogImageGrid}>
                            <CardMedia
                                className={styles.coverDialog}
                                image={image}
                                title={title}
                            />
                        </Grid>
                        <Grid item xs={12} className={styles.dialogTextGrid}>
                            <DialogContentText>
                                <Typography variant={"subtitle1"}>
                                    {description}
                                </Typography>
                            </DialogContentText>
                            <DialogContentText>
                                <Typography variant={"subtitle1"}>
                                    Stack: {tech}
                                </Typography>
                            </DialogContentText>
                            {note && (
                                <DialogContentText
                                    style={{
                                        borderTop: "0.01px solid lightgray",
                                        padding: "12px 0",
                                        marginBottom: "0",
                                    }}
                                >
                                    <Typography variant="subtitle2">
                                        Note: {note}
                                    </Typography>
                                </DialogContentText>
                            )}
                        </Grid>
                    </Grid>

                    <DialogActions>
                        <Button
                            onClick={() => {
                                window.open(link, "_blank");
                            }}
                            color="primary"
                            variant="contained"
                        >
                            Click to proceed
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Card className={styles.root} onClick={handleClickOpen}>
                <Grid item xs={12} className={styles.projectCardGrid}>
                    <CardMedia
                        className={styles.cover}
                        image={image}
                        title={title}
                    />
                    <Typography color="primary" variant="h4">
                        {title}
                    </Typography>
                </Grid>
            </Card>
        </div>
    );
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default ProjectCard;
