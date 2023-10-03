import React from 'react'
import './card.scss'
import bookImg from '../../assets/images/book-icon-transparent-27.jpg'

function ModuleCard() {
  return (
    <>
        <div className='moduleCard'>
            <div className="left">
                <img src={bookImg} alt="un livre" />
            </div>
            <div className="right">
                <div className="title">
                    <h3>Module 1 - AT1 CP3</h3>
                    <p>08h00 - 12h00</p>
                </div>
            </div>
        </div>
        <div className='moduleCard'>
            <div className="left">
                <img src={bookImg} alt="un livre" />
            </div>
            <div className="right">
                <div className="title">
                    <h3>Module 1 - AT1 CP3</h3>
                    <p>13h00 - 16h30</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default ModuleCard