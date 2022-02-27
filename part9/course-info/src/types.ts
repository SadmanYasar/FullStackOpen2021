export interface HeaderProps {
    courseName: string
}

export type CourseType = {
    name: string,
    exerciseCount: number
  }
  
export interface ContentProps {
    courseParts: CourseType[]
}

export interface TotalProps {
    courseParts: CourseType[]
}