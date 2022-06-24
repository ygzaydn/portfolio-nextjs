import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TechItem from "../components/techItem/techItem.tsx";

import "../styles/main.scss";

describe("Test Item Component Tests", () => {
    beforeEach(() => {
        render(<TechItem logo="react-logo" name="React" />);
    });
    it("Renders successfully", () => {});
    it("Text has correct class", () => {
        const text = screen.getByText("React");
        expect(text).toHaveClass("techStack__logoGrid--text");
    });
    it("Text is invisible at first", async () => {
        const img = await screen.getByAltText("react-logo");
        const imgElem = document.getElementsByClassName(img.className);
        const style = getComputedStyle(imgElem[0]).content;
        //console.log(imgElem[0]);
        //console.log(style);
    });
});
