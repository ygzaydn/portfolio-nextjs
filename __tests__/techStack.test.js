import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TechStack from "../components/techStack/techStack.tsx";

import { technologies } from "../constants/technologies";

describe("Tech Stack Component Tests", () => {
    beforeEach(() => {
        render(<TechStack />);
    });
    it("Renders successfully", () => {});
    it("Has multiple Tech Item Component", () => {
        const grid = screen.getByTestId("techItemGrid");
        expect(grid.children.length).toEqual(technologies.length);
    });
    it("Has all technologies on screen", () => {
        technologies.map((el) => {
            const item = screen.getByText(el.name);
            expect(item).toBeVisible();
        });
    });
});
