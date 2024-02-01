import { ChapterCollection } from '@/generated/graphql'

export type ChapterProps = {
    chapterId: string
    stepId: string
    chapters: ChapterCollection
    basePath: string
    chapterCompletedLink: string
}
