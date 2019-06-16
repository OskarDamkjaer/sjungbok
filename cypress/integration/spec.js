describe("Sapper template app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("navigates to /about", () => {
    cy.get("nav a")
      .contains("songs")
      .click();
    cy.url().should("include", "/songs");
  });
});
