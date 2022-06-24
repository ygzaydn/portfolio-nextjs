import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";

import ContactForm from "../components/contactForm/contactForm";

describe("Projects Stack Component Tests", () => {
    beforeEach(() => {
        render(<ContactForm />);
    });
    afterEach(() => {
        cleanup();
    });
    it("Text fields should be visible", () => {
        const emailField = screen.getByLabelText("Email*");
        const messageField = screen.getByLabelText("Message*");
        expect(emailField).toBeVisible();
        expect(messageField).toBeVisible();
    });
    it("Button should be visible", () => {
        const button = screen.getByText("Submit");
        expect(button).toBeVisible();
    });
});
