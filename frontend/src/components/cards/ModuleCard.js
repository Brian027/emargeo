import React from 'react';
import './card.scss';
import bookImg from '../../assets/images/book-icon-transparent-27.jpg';
import { Link } from 'react-router-dom';

function ModuleCard({ emargements }) {

  return (
    <>
      {
        emargements === undefined ? (
          <div className="emptyEmargement">
            <h3>Aucun emargement pour aujourd'hui</h3>
          </div>
        ) : (
          emargements.map((item, index) => (
            <Link to="/emargement/sign" key={index}>


              <div className="moduleCard" key={index}>
                <div className="left">
                  <img src={bookImg} alt="un livre" />
                </div>
                <div className="right">
                  <div className="title">
                    <h3>DEV WEB</h3>
                    <p>
                      {(() => {
                        // CONVERT DATE
                        const date = new Date(item.debut_date);
                        const options = {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        };
                        return date.toLocaleDateString('fr-FR', options);
                      })()}
                    </p>
                  </div>
                </div>
              </div>


            </Link>
          ))
        )}
    </>
  );
}

export default ModuleCard;