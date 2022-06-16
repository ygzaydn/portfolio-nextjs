import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TechGrid from "../components/techGrid/techGrid.tsx";

describe("Tech Grid Component Tests", () => {
    beforeEach(() => {
        render(<TechGrid />);
    });
    it("Renders successfully", async () => {});
    it("Title is visible", () => {
        const title = screen.getByText(/tech stack/i);
        expect(title).toBeVisible();
    });
});
