/// <reference types="cypress" />

describe.skip('entity creation', () => {
    beforeEach(() => {
        cy.session('signed-in', () => {
            cy.signIn()
        })
    })

    //it moves to the first step, ideally we seed the db with some steps but for now we hardcode the ids
    it('it can create an organisation', () => {
        // open dashboard page
        cy.visit('http://localhost:3000/account/organization/create', {
            failOnStatusCode: false,
        })

        cy.wait(5000)

        cy.get('#name-field').type('Test Organisation')
        cy.get('#slug-field').type('test-organisation')
        //get the button
        cy.get('button').contains('Create organization').click()
        cy.get('button').contains('Skip').click()
    })
})
