import { gql } from '@apollo/client'
//TODO: step should be dynamic
export const todosForStepQuery = gql`
    query todosForStep($stepId: String!) {
        onboardStep(id: $stepId) {
            mainImage {
                url
            }
            linkedFrom {
                todoCollection {
                    items {
                        sys {
                            id
                        }
                        description
                        title
                    }
                }
            }
        }
    }
`
