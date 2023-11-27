import React, { useState } from 'react';
import './pad.scss';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import LoaderOne from '../loaders/LoaderOne';

function SignPad() {
    const [signatureData, setSignatureData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState('');

    const clear = () => {
        const canvas = document.querySelector('.sigCanvas');
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        setSignatureData('');
    };

    const setLoadingAndClearError = () => {
        setLoading(true);
        setError('');
    };

    const setLoadingAndShowError = (errorMessage) => {
        setLoading(true);
        setError(errorMessage);
    };

    const save = () => {
        const canvas = document.querySelector('.sigCanvas');
        const dataURL = canvas.toDataURL();
        setSignatureData(dataURL);

        // const id_user = user.data.id;

        // if (id_user) {
        //     axios.post('http://localhost:5000/emargement/sign', { signatureData: dataURL, id_user })
        //         .then((response) => {
        //             console.log(response.data.message);
        //             setResponse(response.data.message);
        //             setLoading(false);
        //         })
        //         .catch((error) => {
        //             console.log('Erreur :', error);
        //             setLoadingAndShowError('Erreur lors de l\'envoi de la signature');
        //         });

        //     setLoadingAndClearError();
        // }
    };

    return (
        <div className="padWrapper">
            <h3>Veuillez signer dans la zone ci-dessous :</h3>
            <div className="container">
                <form>
                    <div className="pad">
                        <SignatureCanvas penColor="black" canvasProps={{ width: 350, height: 150, className: 'sigCanvas' }} />
                    </div>
                    <div className="btnContainer">
                        <button type="button" id="clear" onClick={() => clear()}>
                            Effacer
                        </button>
                        <button id="save" onClick={() => save()} type="button">
                            Valider
                        </button>
                    </div>
                </form>
                <div className="response">
                    {loading && <LoaderOne />}
                    {error && <p className="error">{error}</p>}
                    {response && <p className="success">{response}</p>}
                </div>
            </div>
        </div>
    );
}

export default SignPad;