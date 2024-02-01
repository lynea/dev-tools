import { Button } from '@/components/Button/Button'

import '../../app/globals.css'

describe('Progress Bar', () => {
    it.skip('renders at 50% when 50% of the total is completed', () => {
        // cy.mount(<ProgressBar value={20} max={40} />)

        cy.get('[data-cy=progres-inner]').should('have.css', 'width', '250px')
    })

    it.skip('no progress is shown when the value is 0', () => {
        // cy.mount(<ProgressBar value={0} max={2} />)

        cy.get('[data-cy=progres-inner]').should('have.css', 'width', '0px')
    })
})
