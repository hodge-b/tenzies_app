import React from 'react';

export default function Die(props){

    const styles = {
        backgroundColor: props.isHeld ? "#50C878" : "lightgray"
    }

    return(
        <div 
            className="die--face" 
            onClick={props.holdDice}
            style={styles}
        >{props.value}</div>
    )
}