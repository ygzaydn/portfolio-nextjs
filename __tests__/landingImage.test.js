import { render, screen } from "@testing-library/react";
import LandingImage from "../components/landingImage/landingImage.tsx";
import "@testing-library/jest-dom";

describe("Landing Image Tests", () => {
    beforeEach(() => {
        render(<LandingImage />);
    });
    it("renders correctly", () => {});
    it("Text Checks", () => {
        const upperText = screen.getByText(/Hello I'm/i);
        const lowerText = screen.getByText(/a web developer/i);

        expect(upperText).toBeInTheDocument();
        expect(lowerText).toBeInTheDocument();
    });
    it("Image Check", () => {
        const image = screen.getByTestId("overallGrid");
        expect(image).toBeVisible();
    });
    it("Button Check", async () => {
        const button = screen.getByRole("button");
        expect(button).toBeVisible();
    });
});
