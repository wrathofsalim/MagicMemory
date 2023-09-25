import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { 'src': '/img/earth.png', matched: false },
  { 'src': '/img/grass.png', matched: false },
  { 'src': '/img/heart.png', matched: false },
  { 'src': '/img/moon.png', matched: false },
  { 'src': '/img/star.png', matched: false },
  { 'src': '/img/tree.png', matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [grid, setGrid] = useState('')
  const [modeText, setModeText] = useState()


  // shuffle cards
  const newGame = (mode) => {
    setModeText(mode)
    const shuffleArray = shuffleCards(mode)
    const shuffledCards = [...shuffleArray, ...shuffleArray]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))


    // let gridClassString = '';
    // for (let i = 0; i < mode; i++) {
    //   // gridClassString += '1fr '

    // }

    // setGrid(gridClassString)

    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)

    setCards(shuffledCards)
  }

  const shuffleCards = (mode) => {
    const shuffledArray = cardImages.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.slice(0, mode);
  }

  const handleChoice = (card) => {

    if (choiceOne == null) {
      setChoiceOne(card)
    } else {
      if (choiceTwo == null) {
        setChoiceTwo(card)
      }
    }
  }

  const handleModeChange3x3 = () => {
    newGame(3)
    setGrid('1fr 1fr 1fr')
  };

  const handleModeChange4x4 = () => {
    newGame(4)
    setGrid('1fr 1fr 1fr 1fr')
  };

  const handleModeChange5x5 = () => {
    newGame(5)
    setGrid('1fr 1fr 1fr 1fr')
  };

  const handleModeChange6x6 = () => {
    newGame(6)
    setGrid('1fr 1fr 1fr 1fr')
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src == choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })

        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Magic Memory Match</h1>
      Choose difficulty
      <br />
      <div>
        <button onClick={handleModeChange3x3} >3x3</button>
        <button onClick={handleModeChange4x4} >4x4</button>
      </div>
      <div>
        <button onClick={handleModeChange5x5} >5x5</button>
        <button onClick={handleModeChange6x6} >6x6</button>
      </div>
      <p>Mode: {modeText} tiles</p>
      <p>Turns: {turns}</p>
      <div style={{ gridTemplateColumns: grid,width:'600px' }} className='card-grid'>
        {
          cards.map(card => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))
        }
      </div>

    </div>
  );
}

export default App;
