import React from 'react'

const Total = (props) => {
  const arr = props.parts.map((p) => p.exercises)
  const total = arr.reduce((res, current) => res + current)

  return <b>Number of exercises {total}</b>
}
export default Total
