import { useState } from 'react'

const Header = ({ text }) => (
  <div>
    <h1>{text}</h1>
  </div>
)

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

// const Statistics = ({ good, neutral, bad, all, average, positive }) => {
//   if (!all) {
//     return <div>No feedback given</div>
//   }
//   return (
//     <div>
//       <div>good {good}</div>
//       <div>neutral {neutral}</div>
//       <div>bad {bad}</div>
//       <div>all {all}</div>
//       <div>average {average} </div>
//       <div>positive {positive} %</div>
//     </div>
//   )
// }

const StatisticLine = ({ text, value }) => (
  <div>
    <table>
      <tr>
        {' '}
        {text}
        <td>{value}</td>
      </tr>
    </table>
  </div>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (!all) {
    return <div>No feedback given</div>
  }
  return (
    <div>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive + '%'} />
    </div>
  )
}

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
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={good + neutral + bad}
          average={(good - bad) / (good + bad + neutral)}
          positive={(good / (good + neutral + bad)) * 100}
        />
      </div>
    </div>
  )
}

export default App
