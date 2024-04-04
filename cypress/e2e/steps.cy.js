/// <reference types="cypress" />

describe('navigate steps', () => {
    beforeEach(() => {
        cy.session('signed-in', () => {
            cy.signIn()
        })
    })

    //it moves to the first step, ideally we seed the db with some steps but for now we hardcode the ids
    it('it can navigate trough the onboarding flow', () => {
        // open dashboard page
        cy.visit('http://localhost:3000/onboarding', {
            failOnStatusCode: false,
        })

        cy.wait(2000)

        cy.get('button').contains('Just click here').click()

        cy.wait(1000)

        cy.get('button').contains('mijndomein').click()

        cy.wait(1000)

        cy.get('button').contains('i am ready').click()

        cy.wait(1000)

        cy.get('button').contains('Back').should('be.disabled')

        cy.get('h3').contains('Step One chapter-one')

        cy.get('h3').contains('Todo')

        cy.get('button').contains('Next').click()

        cy.wait(1000)

        //assert that all elements we expect are on this page
        cy.get('h3').contains('Step Two chapter-one')
        cy.get('button').contains('Back').should('not.be.disabled')
        cy.get('button').contains('Next').click()
        cy.wait(1000)

        cy.get('h3').contains('Step three chapter-one')

        cy.get('button').contains('Next').click()
        cy.wait(1000)

        cy.get('h3').contains('Step One chapter-two')

        cy.get('button').contains('Next').click()
        cy.wait(1000)
        cy.get('h3').contains('Step Two chapter-two')

        cy.get('button').contains('Next').click()
        cy.wait(1000)
        cy.get('h3').contains('Step three chapter-two')

        cy.get('button').contains('Next').click()
        cy.wait(1000)

        cy.get('h3').contains('Step One chapter-three')
        cy.get('button').contains('Next').click()
        cy.wait(1000)

        cy.get('h3').contains('Step Two chapter-three')
        cy.get('button').contains('Next').click()
        cy.wait(1000)

        cy.get('h3').contains('Step three chapter-three')
        cy.get('button').contains('Next').click()
        cy.wait(1000)

        cy.get('h3').contains('The department')
        cy.get('button').contains('development').click()
        cy.get('button').contains('i am ready').click()
        cy.get('button').contains('Next').click()
        cy.wait(1000)

        cy.get('button').contains('Next').click()
        cy.wait(1000)

        cy.get('button').contains('Next').click()
        cy.wait(1000)

        cy.get('button').contains('Next').click()
        cy.wait(1000)

        cy.get('button').contains('Next').click()
        cy.wait(1000)

        cy.get('button').contains('Next').click()
        cy.wait(1000)

        cy.get('button').contains('Next').click()
        cy.wait(1000)

        cy.get('button').contains('Next').click()
        cy.wait(1000)

        cy.get('button').contains('Next').click()
        cy.wait(1000)
        //
        cy.get('button[role="checkbox"]')
            .each(($btn) => {
                cy.wrap($btn).click()
            })

            .wait(1000)

        cy.get('h3').contains('Damn, you made it! welcome to the team')
        cy.get('button').contains('Finish').click()
    })
})
