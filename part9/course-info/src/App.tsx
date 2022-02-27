import Content from "./components/Content";
import Header from "./components/Header"
import Total from "./components/Total";
import { CourseType } from "./types";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CourseType[] = [
    {
      name: "Fundamentals",
      exerciseCount: 22
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;