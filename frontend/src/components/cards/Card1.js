import React from 'react'
import './card.scss'
import appImg from '../../assets/images/Notif.png'

function Card1() {
  return (
    <div className='cardItem'>
        <div className="img">
            <img src={appImg} alt="" />
        </div>
    </div>
  )
}

export default Card1