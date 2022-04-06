import { useState } from 'react'

const Header = ({ text }) => (
  <div>
    <h1>{text}</h1>
  </div>
)

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Header text='statistics' />
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good + neutral + bad}</p>
        <p>average {(good - bad) / (good + bad + neutral)} </p>
        <p>positive {(good / (good + neutral + bad)) * 100} %</p>
      </div>
    </div>
  )
}

export default App
