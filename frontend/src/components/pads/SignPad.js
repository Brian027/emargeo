import React, { useState } from 'react';
import './pad.scss';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import LoaderOne from '../loaders/LoaderOne';
import api from '../../api/api';

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

    const save = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const canvas = document.querySelector('.sigCanvas');
            const data = canvas.toDataURL('image/png');
            const signatureData = { signatureData: data };

            const url = api.signEmargement(signatureData, token)
            const response = await url.data;
            console.log(response);
        } catch (error) {
            console.log(error);
        }
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