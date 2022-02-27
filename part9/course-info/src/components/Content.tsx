import { ContentProps } from "../types"

const Content = (props: ContentProps) => {
    return(
      <>
      {
        props.courseParts.map((course, i) => 
        <p key={i}>{course.name} {course.exerciseCount}</p>)
      }
      </>
    )
}

export default Content