import React, { useState } from "react";

import { Dialog, DialogActions, DialogContent, Slide } from "@mui/material";

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
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <h4 className="text-blue-400 text-2xl mb-6 text-center px-8 py-4 border-b">
          {title}
        </h4>

        <DialogContent>
          <div className="flex flex-col">
            <img
              src={`/webP/${image}.webp`}
              className="align-center max-h-80 object-contain"
              alt={`${image}-big`}
            />

            <div className="flex flex-col">
              <p className="my-6 text-md">{description}</p>

              <p className="my-2 text-md">Stack: {tech}</p>

              {note && (
                <p
                  className="my-2 text-md"
                  style={{
                    borderTop: "0.01px solid lightgray",
                    padding: "12px 0",
                    marginBottom: "0",
                  }}
                >
                  Note: {note}
                </p>
              )}
            </div>
          </div>

          <DialogActions>
            <button
              className="bg-blue-400 my-5 px-6 py-3 rounded-md font-semibold text-slate-50 hover:bg-blue-500 transition-all"
              onClick={() => {
                window.open(link, "_blank");
              }}
            >
              Click to proceed
            </button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <div
        className="group flex cursor-pointer min-h-full bg-transparent w-100 h-60 relative  rounded-sm hover:z-30 border-2 border-black"
        onClick={handleClickOpen}
      >
        <div className="projectCardGrid">
          <img
            src={`/webP/${image}.webp`}
            className="group-hover:scale-150 group-hover:rounded-xl transition cover group-hover:brightness-50"
            alt={`${image}-big`}
          />
          <h4 className=" group-hover:flex group-hover:text-slate-50 text-3xl group-hover:z-50 tracking-wider drop-shadow-xl">
            {title}
          </h4>
        </div>
      </div>
    </div>
  );
};

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => (
  <Slide direction="up" {...props} ref={ref} />
));

export default ProjectCard;

/*
.root {
  
    &:hover {
        cursor: pointer;
        & h4 {
            text-shadow: 2px 2px 0 #4b6587, 2px -2px 0 #4b6587,
                -2px 2px 0 #4b6587, -2px -2px 0 #4b6587, 2px 0px 0 #4b6587,
                0px 2px 0 #4b6587, -2px 0px 0 #4b6587, 0px -2px 0 #4b6587;
            display: inherit;
            z-index: 50;
            color: black;
        }
        & div {
            & img {
                transform: scale(1.5);
                overflow: hidden;
                filter: brightness(10%);
            }
        }
    }
}

*/
