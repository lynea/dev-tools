/// <reference types="cypress" />

describe('team select', () => {
    beforeEach(() => {
        cy.session('signed-in', () => {
            cy.signIn()
        })
    })

    it('it can select a team', () => {
        // open dashboard page
        cy.visit('http://localhost:3000/onboarding', {
            failOnStatusCode: false,
        })

        // check h1 says signed in
        cy.get('button').contains('Just click here').click()

        cy.wait(1000)

        cy.get('button').contains('Turbo snails').click()

        cy.get('p').contains(
            'Great choise ! now lets learn more about the company'
        )

        cy.get('button').contains('i am ready').click()
    })
})
