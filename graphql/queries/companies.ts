import { gql } from '@apollo/client'

export const allCompaniesQuery = gql`
    query allCompanies {
        companyCollection(limit: 3) {
            items {
                name
                alias

                sys {
                    id
                }
                linkedFrom {
                    chapterCollection(limit: 50) {
                        items {
                            sys {
                                id
                            }

                            linkedFrom {
                                onboardStepCollection(limit: 10) {
                                    items {
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
                # add the fields you want to query
            }
        }
    }
`

export const companiesQuery = gql`
    query Companies($id: String!) {
        company(id: $id) {
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
