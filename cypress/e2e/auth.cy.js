/// <reference types="cypress" />

describe('Signed in', () => {
    beforeEach(() => {
        cy.session('signed-in', () => {
            cy.signIn()
        })
    })

    it('navigate to the dashboard', () => {
        // open dashboard page
        cy.visit('http://localhost:3000/onboarding', {
            failOnStatusCode: false,
        })
    })
})
