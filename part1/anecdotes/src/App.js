import React, { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Header = ({ text }) => <h1>{text}</h1>

const Winner = ({ votes, anecdotes }) => {
  const highestVotes = Math.max(...votes)
  const winningAnecdote = anecdotes[votes.indexOf(highestVotes)]

  return (
    <div>
      {winningAnecdote}
      <div>has {highestVotes} votes</div>
    </div>
  )
}

// const Winner = ({ anecdotes, votes }) => {
//   const highestVotes = Math.max(...votes)
//   const winningAnecdote = anecdotes[votes.indexOf(highestVotes)]
//   return (
//     <div>
//       {winningAnecdote} {votes}
//     </div>
//   )
// }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const handleSelectClick = () => {
    const random = () => Math.floor(Math.random() * 6)
    setSelected(random)
  }

  const handleVotesClick = () => {
    const votesArray = [...votes]
    votesArray[selected] += 1
    setVotes(votesArray)
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <Button handleClick={handleVotesClick} text='vote' />
      <Button handleClick={handleSelectClick} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <Winner anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
