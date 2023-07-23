/// <reference types="cypress" />

describe('should be able to log in', () => {
    beforeEach(() => {
        cy.session('signed-in', () => {
            cy.signIn()
        })
    })

    it('it can acces the onboarding dashboard when signed in', () => {
        // open dashboard page
        cy.visit('http://localhost:3000/onboarding', {
            failOnStatusCode: false,
        })

        // check h1 says signed in
        cy.get('h1').contains('Signed in')
    })
})
