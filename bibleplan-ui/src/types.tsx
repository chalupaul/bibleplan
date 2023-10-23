
export interface ReadingPlan {
    name: string,
    readings: Reading[]
}
export interface Reading {
    key: string,
    text: string,
    checked: boolean
}