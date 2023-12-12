export enum Team {
    snails = 'snails',
    bees = 'bees',
    ducks = 'ducks',
}

export type TeamSelectProps = {
    teams: Array<{
        __typename?: 'Team'
        name?: string | null
        alias?: string | null
        sys: { __typename?: 'Sys'; id: string }
        linkedFrom?: {
            __typename?: 'TeamLinkingCollections'
            chapterCollection?: {
                __typename?: 'ChapterCollection'
                items: Array<{
                    __typename?: 'Chapter'
                    id?: number | null
                    sys: { __typename?: 'Sys'; id: string }
                    linkedFrom?: {
                        __typename?: 'ChapterLinkingCollections'
                        onboardStepCollection?: {
                            __typename?: 'OnboardStepCollection'
                            items: Array<{
                                __typename?: 'OnboardStep'
                                step?: number | null
                                sys: { __typename?: 'Sys'; id: string }
                            } | null>
                        } | null
                    } | null
                } | null>
            } | null
        } | null
    } | null>
}
