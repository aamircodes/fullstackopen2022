import React from 'react'

const Header = ({ course }) => {
  return <h3>{course.name}</h3>
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((total, part) => total + part.exercises, 0)
  return (
    <div>
      <b>total of {sum} exercises</b>
    </div>
  )
}

export default Course
