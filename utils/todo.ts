const incrementStep = (
    basePath: string,
    currentChapter: string,
    nextStepId: string
) => `${basePath}/${currentChapter}/${nextStepId}`

const decrementStep = (
    basePath: string,
    currentChapter: string,
    previousStepId: string
) => {
    return `${basePath}/${currentChapter}/${previousStepId}`
}

//how can i know the first step of the next chapter ?
const incrementChapter = (
    basePath: string,
    nextChapterInfo: { id: string; firstStepId: string }
) => `${basePath}/${nextChapterInfo.id}/${nextChapterInfo.firstStepId}`

const decrementChapter = (
    basePath: string,
    prevChapter: { id: string; lastStepId: string }
) => `${basePath}/${prevChapter.id}/${prevChapter.lastStepId}`

export { incrementStep, decrementStep, incrementChapter, decrementChapter }
