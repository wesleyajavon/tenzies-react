import Die from './components/Die'
import { useState, useEffect, useRef } from 'react'
import './index.css'
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = useState(() => generateAllNewDice())
  const [count, setCount] = useState(0)
  const redirectButton = useRef(null)


  const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if (gameWon) {
      redirectButton.current?.focus()
    }

  }, [gameWon])


  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }

  function rollDice() {

    if (!gameWon) {
      setDice(oldDice => oldDice.map(die =>
        die.isHeld ?
          die :
          { ...die, value: Math.ceil(Math.random() * 6) }
      ))

      setCount(prevValue => prevValue + 1)
    } else {
      setDice(generateAllNewDice())
      setCount(0)
    }
  }

  function hold(id) {
    setDice(oldDice => oldDice.map(die => die.id === id ?
      { ...die, isHeld: !die.isHeld } : die
    )
    )
  }


  const diceElements = dice.map(dieObj =>
    <Die
      id={dieObj.id}
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />)

  return (
    <span>

      <main>
        {gameWon && <Confetti />}
        <div aria-live="polite" className='sr-only'>
          {gameWon && <p>Congratulations! You've won! Press "New Game" to start again.</p>}
        </div>
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <p className='instructions'>You have rolled the dice {count} times.</p>
        <div className='die-container'>
          {diceElements}
        </div>

        <div>
          <button ref={redirectButton} className='roll-dice' onClick={rollDice}>
            {gameWon ? "New Game" : "Roll"}
          </button>
        </div>
      </main>

    </span>

  )
}

