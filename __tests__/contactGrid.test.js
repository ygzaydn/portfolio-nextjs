import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ContactGrid from "../components/contactGrid/contactGrid";

describe("Projects Stack Component Tests", () => {
    beforeEach(() => {
        render(<ContactGrid />);
    });
    afterEach(() => {
        cleanup();
    });
    it("Title should be visible", () => {
        const title = screen.getByText("Contact");
        expect(title).toBeVisible();
    });
});
