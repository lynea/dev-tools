import { gql } from '@apollo/client'

export const allGobalChaptersInfoQuery = gql`
    query allGobalChaptersInfo {
        chapterCollection(where: { team_exists: false }) {
            total
            items {
                name
                sys {
                    id
                }

                linkedFrom {
                    onboardStepCollection {
                        total
                        items {
                            title
                            body
                            codeBlock
                            step
                            sys {
                                id
                            }
                        }
                    }
                }
            }
        }
    }
`
