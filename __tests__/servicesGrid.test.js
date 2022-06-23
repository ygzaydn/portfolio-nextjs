import { render, screen } from "@testing-library/react";
import ServicesGrid from "../components/servicesGrid/servicesGrid.tsx";
import "@testing-library/jest-dom";
import { services } from "../constants/services";

describe("Services Grid Tests", () => {
    beforeEach(() => {
        render(<ServicesGrid />);
    });
    it("Renders Successfully", () => {});
    it("Has Services More Than 0", () => {
        const grid = screen.getByTestId("servicesGrid");
        expect(grid).toBeInTheDocument();
        const items = screen.getAllByTestId("serviceCardGrid");
        expect(items.length).toBeGreaterThan(0);
    });
    it("Has All Services", () => {
        services.map((el) => {
            const text = screen.getByText(el.title);
            expect(text).toBeInTheDocument();
            expect(text).toBeVisible();
        });
    });
});
