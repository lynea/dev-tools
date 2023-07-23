import { gql } from '@apollo/client'

export const allChaptersInfoQuery = gql`
    query chapterCollection {
        chapterCollection {
            items {
                linkedFrom {
                    onboardStepCollection {
                        items {
                            step
                            sys {
                                id
                            }
                        }
                    }
                }
                sys {
                    id
                }
                # add the fields you want to query
            }
        }
    }
`
