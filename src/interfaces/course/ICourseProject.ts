export interface ICourseProject {
    id: number,
    discipline_id: number,
    user_student_id: number,
    percent_of_complete: number,
    stages: Array<ICourseProjectStage>
    discipline: IDiscipline
}

export interface ICourseProjectStage {
    id: number
    course_project_id: number
    title: string
    description: string
    is_done: boolean
    deadline_date: string
}

export interface IDiscipline {
    id: number
    discipline_name: string
    count_of_hours: number
    description: string
}