export interface StepPageParams {
    teamId: string
    chapterId: string
    stepId: string
}
export interface CompanyStepPageParams {
    companyId: string
    chapterId: string
    stepId: string
}
export interface DepartmentStepPageParams {
    departmentId: string
    chapterId: string
    stepId: string
}

export interface TeamsStepPageParams {
    teamId: string
    chapterId: string
    stepId: string
}

export interface GlobalStepPageParams {
    chapterId: string
    stepId: string
}

export interface TeamPageParams {
    team: string
}

export interface CompletedPageParams {
    teamId: string
}
