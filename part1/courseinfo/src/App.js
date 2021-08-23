import React from 'react'

const Header = (props) => {
  console.log(props)
  return (
      <h1>{props.course}</h1>
  )

}

const Content = (props) => {
  return (
      <div>
        <p>{props[0].name} {props[0].exercises}</p>
        <p>{props[1].name} {props[1].exercises}</p>
        <p>{props[2].name} {props[2].exercises}</p>
      </div>
  )

}

const Total = (props) => {
  return (
      props.name
  )

}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course} />
      <Content parts = {parts} />
      <Total parts = {parts} />
    </div>
  )
}

export default App