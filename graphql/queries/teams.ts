import { gql } from '@apollo/client'

export const allTeamsInfoQuery = gql`
    query allTeamsInfo {
        teamCollection(limit: 3) {
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

// get all chapters for a company

// get alll chapters for a team

// get all chapters for a department

//chapter can be tied to a company or a team or a department. global means that its a organisation wide one

export const teamsQuery = gql`
    query Teams($id: String!) {
        team(id: $id) {
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
