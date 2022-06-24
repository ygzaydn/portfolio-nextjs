import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TechItem from "../components/techItem/techItem.tsx";

describe("Test Item Component Tests", () => {
    beforeEach(() => {
        render(<TechItem logo="react-logo" name="React" />);
    });
    it("Renders successfully", () => {});
    it("Text has correct class", () => {
        const text = screen.getByText("React");
        expect(text).toHaveClass("techStack__logoGrid--text");
    });
});
