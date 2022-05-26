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

const ProjectCard = ({
    title,
    description,
    image,
    tech,
    link,
    note,
    limit,
    width,
    size,
}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGridSize = () => {
        switch (size) {
            case "big":
                return {
                    gridColumn: "span 2",
                    gridRow: "span 1",
                };

            case "huge":
                return {
                    gridColumn: "span 2",
                    gridRow: "span 2",
                };
            case "long":
                return {
                    gridColumn: "span 1",
                    gridRow: "span 2",
                };
            default:
                return null;
        }
    };

    return (
        <div className="gridSize" style={{ ...handleGridSize() }}>
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
                    <Grid container className="dialogContainer">
                        <Grid item xs={12} className="dialogImageGrid">
                            <CardMedia
                                className="coverDialog"
                                image={image}
                                title={title}
                            />
                        </Grid>
                        <Grid item xs={12} className="dialogTextGrid">
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
            <Card className="root" onClick={handleClickOpen}>
                <Grid item xs={12} className="projectCardGrid">
                    <CardMedia className="cover" image={image} title={title} />
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
