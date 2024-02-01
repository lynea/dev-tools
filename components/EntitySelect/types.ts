export enum Team {
    snails = 'snails',
    bees = 'bees',
    ducks = 'ducks',
}

export type Entity = {
    id: string
    firstStepId: string
    name: string
    firstChapterId: string
}

export type Entities = Array<Entity>

export type EntitySelectProps = {
    entities: Entities
    navigationPath: string
    smallButtonWhenSingleEntity?: boolean
}
