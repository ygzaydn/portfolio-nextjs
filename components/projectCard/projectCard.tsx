import React, { useState } from "react";

import {
    Grid,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    Slide,
    Button,
    Card,
    CardMedia,
} from "@mui/material";

import { SlideProps } from "@mui/material/Slide";

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    tech: string;
    link: string;
    note?: string;
    size?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    image,
    tech,
    link,
    note,
    size,
}) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const handleGridSize = (): object | null => {
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

                <DialogContent>
                    <Grid container className="dialogContainer">
                        <Grid item xs={12} className="dialogImageGrid">
                            <img
                                src={`/webP/${image}.webp`}
                                className="dialogImageGrid__coverDialog"
                                alt={`${image}-big`}
                            />
                        </Grid>
                        <Grid item xs={12} className="dialogTextGrid">
                            <Typography variant={"subtitle1"}>
                                {description}
                            </Typography>

                            <Typography variant={"subtitle1"}>
                                Stack: {tech}
                            </Typography>

                            {note && (
                                <Typography
                                    variant="subtitle2"
                                    style={{
                                        borderTop: "0.01px solid lightgray",
                                        padding: "12px 0",
                                        marginBottom: "0",
                                    }}
                                >
                                    Note: {note}
                                </Typography>
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
                    <img
                        src={`/webP/${image}.webp`}
                        className="cover"
                        alt={`${image}-big`}
                    />
                    <Typography color="primary" variant="h4">
                        {title}
                    </Typography>
                </Grid>
            </Card>
        </div>
    );
};

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => (
    <Slide direction="up" {...props} ref={ref} />
));

export default ProjectCard;
