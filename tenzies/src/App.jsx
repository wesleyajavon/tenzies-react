import Die from './components/Die'
import { useState } from 'react'
import './index.css'

export default function App() {

  const [dice, setDice] = useState(generateAllNewDice)
  const [goodDie, setGoodDie] = useState(null)

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => Math.ceil(Math.random() * 6))
  }

  const diceElements = dice.map((num, index) =>
    <Die
      id={index}
      key={index}
      value={num}
      valid={false}
    />)

  return (
    <span>

      <main>

        <div className='die-container'>
          {diceElements}
        </div>
        <div className='roll-dice'>
        <button>Roll</button>
      </div>
      </main>

    </span>

  )
}

