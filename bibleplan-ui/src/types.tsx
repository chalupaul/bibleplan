
export interface ReadingPlan {
    name: string,
    readings: Reading[]
}
export interface Reading {
    key: string,
    text: string,
    checked: boolean
}

export interface PlanBrief {
    key: string,
    name: string,
    desc: string,
    tags: string[]
}

export interface PlanBriefs {
    briefs: PlanBrief[]
}