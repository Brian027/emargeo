import React from 'react'
import './pad.scss'

function SignPad() {
  return (
    <div className='padWrapper'>
        <h3>Veuillez signez dans la zone ci dessous :</h3>
        <div className="container">
            <div className="pad">
                <canvas id="canvas"></canvas>
            </div>
            <div className="btnContainer">
                <button id="clear">Effacer</button>
                <button id="save">Enregistrer</button>
            </div>
        </div>
    </div>
  )
}

export default SignPad