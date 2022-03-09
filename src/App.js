import React from 'react';
import {nanoid} from 'nanoid';
import Die from './components/Die';

export default function App(){

    const [diceAmount, setDiceAmount] = React.useState(10);
    const [dice, setDice] = React.useState(setupDice());
    const [rollCount, setRollCount] = React.useState(1);
    const [isWon, setIsWon] = React.useState(false);

    function getRandomNumber(limit){
        return Math.ceil(Math.random()*limit);
    }

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue);
        if(allHeld && allSameValue){
            setIsWon(true);
        }
    }, [dice]);

    function setupDice(){
        const newDiceArray = [];
        for(let i = 0; i < diceAmount; i++){
            const updateObject = {
                id: nanoid(),
                value: getRandomNumber(6),
                isHeld: false
            }
            newDiceArray.push(updateObject);
        }
        return newDiceArray;
        
    }

    function handleClick(){
        if(!isWon){
            setDice(prevDice => prevDice.map(die => {
                return {
                    ...die,
                    value: !die.isHeld ? getRandomNumber(6) : die.value
                }
            }))
            setRollCount(prevCount => prevCount + 1)
        }else{
            setDice(setupDice());
            setRollCount(1);
            setIsWon(false);
        }
    }

    function holdDice(id){
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    const dieElements = dice.map(die => (
        <Die 
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))

    return(
        <main>
            <h1 className="main--title">Tenzies Clone</h1>
            <p>The objective of the game is to hold dice of the same value and end with all dice showing the same value in the least amount of rolls.</p>
            {!isWon? <div className="game-container">
                {dieElements}
            </div> : <h1>YOU WON!!!</h1>}
            <button className="btn btn--roll" onClick={handleClick}>{!isWon? "Roll Dice" : "Play Again"}</button>
            <div className="roll-counter">{!isWon ? `Current Roll: ${rollCount}` : `Total Rolls: ${rollCount}`}</div>
        </main>
    )
}