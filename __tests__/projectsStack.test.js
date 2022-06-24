import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ProjectsStack from "../components/projectsStack/projectsStack";
import { projects } from "../constants/projects";

describe("Projects Stack Component Tests", () => {
    beforeEach(() => {
        render(<ProjectsStack />);
    });
    afterEach(() => {
        cleanup();
    });
    it("Title should be visible", () => {
        const title = screen.getByText("Projects");
        expect(title).toBeVisible();
    });
    it("Subtitle should be visible", () => {
        const subtitle = screen.getByText(
            "Projects that I've developed are listed below, you can click images to get details."
        );
        expect(subtitle).toBeVisible();
    });
    it("All projects should be visible", () => {
        projects.map((el) => {
            const project = screen.getByText(el.title);
            expect(project).toBeVisible();
        });
    });
});
