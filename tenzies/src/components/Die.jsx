import { useState } from 'react'
import '../index.css'


export default function Die(props) {

    var isHeld = props.isHeld

    const styles = {
        backgroundColor: isHeld ? "#59E391" : "#c5c5c5"
    }


    return (
        <button
            id={props.id}
            onClick={props.hold}
            style={styles} 
            aria-pressed={props.isHeld} 
            aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}>
                
                {props.value}</button>
    )
}