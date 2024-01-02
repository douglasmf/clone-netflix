import React from 'react'
import './header.sass'

const Header = ({black}) => {
  return (
    <header className={black ? 'black' : ''}>
        <div className='header--logo'>
          <a href="./">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png" alt="Netflix" />
          </a>
        </div>
        <div className="header--user">
          <a href="/">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOrQpQ_xH-h3H8_K-maor_cyVdAYOOOoXrYA&usqp=CAU" alt="Usuario" />
          </a>
        </div>
    </header>
  )
}

export default Header