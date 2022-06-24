import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ProjectCard from "../components/projectCard/projectCard";
import { projects } from "../constants/projects";
import userEvent from "@testing-library/user-event";

describe("Projects Stack Component Tests", () => {
    beforeEach(() => {
        render(
            <ProjectCard
                {...projects[0]}
                image={projects[0].image.src}
                gif={projects[0].gif.src}
            />
        );
    });

    afterEach(() => {
        cleanup();
    });

    it("Title should be visible", () => {
        const title = screen.getByText(projects[0].title);
        expect(title).toBeVisible();
    });

    it("Button should be visible after clicking element", async () => {
        const title = screen.getByText(projects[0].title);
        await userEvent.click(title);

        const button = screen.getByText("Click to proceed");
        expect(button).toBeInTheDocument();
    });

    it("Stack should be visible after clicking element", async () => {
        const title = screen.getByText(projects[0].title);
        await userEvent.click(title);

        const stack = screen.getByText(/stack/i);
        expect(stack).toBeInTheDocument();
    });
});
