import React from 'react'
import './pad.scss'
import SignatureCanvas from 'react-signature-canvas'

function SignPad() {
    // Signature pad

    // Clear signature
    const clear = () => {
        const canvas = document.querySelector('.sigCanvas')
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    }

    // Save signature
    const save = () => {
        const canvas = document.querySelector('.sigCanvas')
        const dataURL = canvas.toDataURL()
        console.log(dataURL)
    }

  return (
    <div className='padWrapper'>
        <h3>Veuillez signez dans la zone ci dessous :</h3>
        <div className="container">
            <form action="" method="post" id='signForm'>
                <div className="pad">
                    <SignatureCanvas penColor='black' canvasProps={{width: 350, height: 150, className: 'sigCanvas'}} />
                </div>
                <div className="btnContainer">
                    <button type='button' id="clear" onClick={clear}>Effacer</button>
                    <button id="save" onClick={save} type="button">Valider</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignPad