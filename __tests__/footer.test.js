import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Footer from "../components/footer/footer";

describe("Projects Stack Component Tests", () => {
    beforeEach(() => {
        render(<Footer />);
    });
    afterEach(() => {
        cleanup();
    });
    it("Grid should be visible", () => {
        const grid = screen.getByTestId("footerGrid");
        expect(grid).toBeInTheDocument();
        expect(grid.childNodes.length).toEqual(3);
    });
    it("Mail should be visible", () => {
        const mail = screen.getByText("ygzaydns@gmail.com");
        expect(mail).toBeInTheDocument();
    });
});
