/// <reference types="cypress" />
// @ts-nocheck

Cypress.Commands.add(`signOut`, () => {
  cy.log(`sign out by clearing all cookies.`);
  cy.clearCookies({ domain: undefined });
});

Cypress.Commands.add(`signIn`, () => {
  cy.log(`Signing in.`);
  cy.visit(`http://localhost:3000/onboarding`);

  cy.window()
    .should((window) => {
      expect(window).to.not.have.property(`Clerk`, undefined);
      expect(window.Clerk.isReady()).to.eq(true);
    })
    .then(async (window) => {
      let identifier = Cypress.env("user").identifier;
      let password = Cypress.env("user").password;
      await cy.clearCookies({ domain: window.location.domain });
      const res = await window.Clerk.client.signIn.create({
        identifier,
        password,
      });

      await window.Clerk.setActive({
        session: res.createdSessionId,
      });

      cy.log(`Finished Signing in.`);
    });
});

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
