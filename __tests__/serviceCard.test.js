import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ServiceCard from "../components/serviceCard/serviceCard.tsx";

describe("Service Card Tests", () => {
    beforeEach(() => {
        render(<ServiceCard />);
    });
    it("Renders Successfully", () => {});
    it("Hover as desired", () => {
        const grid = screen.getByTestId("serviceCardGrid");
        expect(grid).toHaveClass("serviceCardGrid");
    });
    it("Visible Items", () => {
        const logo = screen.getByTestId("serviceCardGrid-logo");
        const title = screen.getByTestId("serviceCardGrid-title");
        const description = screen.getByTestId("serviceCardGrid-description");
        expect(logo).toBeVisible();
        expect(title).toBeVisible();
        expect(description).toBeVisible();
    });
});
