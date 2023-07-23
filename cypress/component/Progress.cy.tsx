import { Button } from '@/components/Button/Button'
import { ProgressBar } from '@/components/Progres/Progres'
import '../../app/globals.css'

describe('Progress Bar', () => {
    it('renders at 50% when 50% of the total is completed', () => {
        cy.mount(<ProgressBar value={20} max={40} />)

        cy.get('[data-cy=progres-inner]').should('have.css', 'width', '250px')
    })

    it('no progress is shown when the value is 0', () => {
        cy.mount(<ProgressBar value={0} max={2} />)

        cy.get('[data-cy=progres-inner]').should('have.css', 'width', '0px')
    })
})
