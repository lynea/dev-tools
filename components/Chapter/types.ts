import { Chapter, Step } from '@prisma/client'

export type ChapterProps = {
    chapterId: string
    stepId: string
    chapters: Array<Chapter & { steps: Step[] }>
    basePath: string
    chapterCompletedLink: string
    entityTitle: string
}
