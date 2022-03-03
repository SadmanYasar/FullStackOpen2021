import { ContentProps } from "../types"
import Part from "./Part"

const Content = (props: ContentProps) => {
    return(
      <>
      {
        props.courseParts.map((course, i) => 
        <Part key={i} coursePart={course} />)
      }
      </>
    )
}

export default Content