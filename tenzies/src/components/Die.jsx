import { useState } from 'react'
import '../index.css'


export default function Die(props) {

    var valid = props.valid

    function toGreen() {
        valid ? document.getElementById(props.id).style.backgroundColor = "#c5c5c5" : document.getElementById(props.id).style.backgroundColor = "green"
        valid = !valid 
    }


    return (
        <button id={props.id} onClick={toGreen}>{props.value}</button>
    )
}