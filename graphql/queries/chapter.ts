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

export const createQueryForEntity = (entity: string) => {
    return gql`
        query chaptersFor${entity}($id: String!) {
            ${entity}(id: $id) {
                name
                linkedFrom {
                    chapterCollection {
                        total
                        items {
                            sys {
                                id
                            }
                            name

                            linkedFrom {
                                onboardStepCollection {
                                    total
                                    items {
                                        sys {
                                            id
                                        }
                                        step
                                        title
                                        body
                                        codeBlock
                                    }
                                }
                            }
                        }
                    }
                }
                # add the fields you want to query
            }
        }
    `
}
