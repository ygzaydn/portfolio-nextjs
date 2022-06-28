/// <reference types="cypress" />

import "@testing-library/cypress/add-commands";

import { blogPosts } from "../../../blog";

describe("E2E Tests of Portfolio Page", () => {
    it("Animation should work on hover blog button", () => {
        cy.visit("localhost:3000");
        const button = cy.contains(/check out my blog!/i);
        button.should("have.css", "color", "rgb(0, 0, 0)");
    });

    it("Blog button should navigate to /blog ", () => {
        cy.visit("localhost:3000");
        const button = cy.contains(/check out my blog!/i);
        button.click();
        cy.url().should("include", "blog");
    });

    it("Back to home button should navigate to / ", () => {
        cy.visit("localhost:3000/blog");
        const button = cy.contains(/Back to home/i);
        button.click();
        cy.url().should("include", "/");
    });
    it("Should correctly navigate a blog post when clicked", () => {
        cy.visit("localhost:3000/blog");
        const button = cy.contains(blogPosts[0].title);
        button.click();
        cy.url().should("include", blogPosts[0].key);
    });
    it("Should correcly go back to blog page when clicked to arrow", () => {
        cy.visit("localhost:3000/blog/1");
        const button = cy.get('[data-testid="KeyboardReturnIcon"]');
        button.click();
        cy.url().should("include", "/blog");
    });
});
