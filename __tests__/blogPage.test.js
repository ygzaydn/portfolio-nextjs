import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Blog from "../pages/blog";
import { blogTechnologies } from "../constants/blogTechnologies";
import blogPosts from "../blog";

jest.mock("next/router", () => ({
    useRouter: () => ({
        query: { myProp: "myValue" },
    }),
}));

describe("Blog Page tests", () => {
    beforeEach(() => {
        render(<Blog />);
    });
    afterEach(() => {
        cleanup();
    });

    it("Texts should be visible", () => {
        const subTitle = screen.getByText(
            "You can find my blog posts here. I like writing while learning new stuff!"
        );
        const topics = screen.getByText("Topics");
        const posts = screen.getByText("Posts");
        const button = screen.getByText("Back to Home");

        expect(subTitle).toBeVisible();
        expect(topics).toBeVisible();
        expect(posts).toBeVisible();
        expect(button).toBeVisible();
    });
    it("Technologies should be visible", () => {
        blogTechnologies.forEach((el) => {
            const blog = screen.getByText(el.name);
            expect(blog).toBeVisible();
        });
    });
    it("Posts should be visible", () => {
        blogPosts.forEach((el) => {
            const blog = screen.getByText(el.title);
            expect(blog).toBeVisible();
        });
    });
});
