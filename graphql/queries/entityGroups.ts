import { gql } from '@apollo/client'

export const firstGroupWithEntity = gql`
    query firstGroupWithEntity {
        entityGroupCollection(order: level_ASC, limit: 1) {
            items {
                sys {
                    id
                }
                name
                level
                linkedFrom {
                    entityCollection {
                        items {
                            name
                            sys {
                                id
                            }
                            linkedFrom {
                                chapterCollection(limit: 1, order: id_ASC) {
                                    items {
                                        sys {
                                            id
                                        }

                                        linkedFrom {
                                            onboardStepCollection(
                                                limit: 1
                                                order: step_ASC
                                            ) {
                                                items {
                                                    sys {
                                                        id
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export const entityGroupQuery = gql`
    query entityGroup($id: String!) {
        entityGroup(id: $id) {
            name
            level
            linkedFrom {
                entityCollection {
                    items {
                        name
                        sys {
                            id
                        }
                        linkedFrom {
                            chapterCollection(limit: 1, order: id_ASC) {
                                items {
                                    sys {
                                        id
                                    }

                                    linkedFrom {
                                        onboardStepCollection(
                                            limit: 1
                                            order: step_ASC
                                        ) {
                                            items {
                                                sys {
                                                    id
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export const entityInfoQuery = gql`
    query entityInfo($id: String!) {
        entity(id: $id) {
            parent {
                level
            }
            name
            linkedFrom {
                chapterCollection(order: id_ASC) {
                    total
                    items {
                        sys {
                            id
                        }
                        name

                        linkedFrom {
                            onboardStepCollection(order: step_ASC) {
                                total
                                items {
                                    sys {
                                        id
                                    }
                                    step
                                    title
                                    body
                                    codeBlock
                                    youtubeId
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export const allEntityGroupQuery = gql`
    query allEntityGroup($id: String!) {
        entityGroupCollection(
            order: level_ASC
            where: { parent: { sys: { id: $id } } }
        ) {
            items {
                name
                level
                sys {
                    id
                }
                linkedFrom {
                    entityCollection {
                        items {
                            sys {
                                id
                            }
                            name
                            description
                        }
                    }
                }
            }
        }
    }
`

export const allEntityGroupWithEntityQuery = gql`
    query allEntityGroupWithEntity {
        entityGroupCollection(order: level_ASC) {
            items {
                sys {
                    id
                }
                name
                linkedFrom {
                    entityCollection {
                        items {
                            sys {
                                id
                            }
                            name
                            description
                        }
                    }
                }
            }
        }
    }
`

export const chapterWithFirstStepQuery = gql`
    query chapterWithFirstStep($id: String!) {
        chapter(id: $id) {
            linkedFrom {
                onboardStepCollection(order: step_ASC, limit: 1) {
                    items {
                        sys {
                            id
                        }
                    }
                }
            }
        }
    }
`
