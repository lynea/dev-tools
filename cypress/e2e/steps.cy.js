/// <reference types="cypress" />

describe("navigate steps", () => {
  beforeEach(() => {
    cy.session("signed-in", () => {
      cy.signIn();
    });
  });

  //it moves to the first step, ideally we seed the db with some steps but for now we hardcode the ids
  it("it can acces the onboarding dashboard when signed in", () => {
    // open dashboard page
    cy.visit(
      "http://localhost:3000/onboarding/zlwVLa1bEFrULYbe1KUQ4/1/6cNuonZRgfL9hEVlR2JHDR",
      {
        failOnStatusCode: false,
      }
    );

    cy.wait(5000);

    cy.get("h3").contains("Better. Smarter. Simpler");

    cy.get("button").contains("Previous").should("not.exist");

    cy.get("button").contains("Next").click();

    cy.wait(5000);

    //assert that all elements we expect are on this page
    cy.get("h3").contains("Part of The sharing group");
    cy.get("h3").contains("Todo");

    cy.get("button").contains("Previous");

    cy.get("button").contains("Next").click();

    cy.wait(5000);

    //assert that all elements we expect are on this page
    cy.get("h3").contains("Turbo snails");

    cy.get("button").contains("Next");
    cy.get("button").contains("Previous").click();

    cy.wait(5000);

    //navigate back and check if its the page we expect
    cy.get("h3").contains("Part of The sharing group");
    cy.get("h3").contains("Todo");

    cy.get("button").contains("Previous");

    //complete a todo on this page
    cy.get('[data-testid="body-todos"]').find('input[type="checkbox"]').click();

    //TODO: clear the db of todos before running this test

    //   .wait(5000);

    // cy.get('[data-testid="body-todos"]')
    //   .find('input[type="checkbox"]')
    //   .should("be.checked");
  });
});
