import React from 'react';
import { Link } from 'react-router-dom';
import pokegif from '../../img/gif3.gif'
import pokegif2 from '../../img/gif5.gif'
import pokegif3 from '../../img/gif6.gif'
import './Landing.css';

const Landing = () => {
    return (
        <div className="container-landing">
             <header className="landing-header">
             <img className="logo3"src={pokegif2} alt="Loading..." width="12%" />
             <img className="logo4"src={pokegif3} alt="Loading..." width="12%" />
                 <div className="wrapper">
            <p className="title">The Pokemons App</p>
            </div>
            <div className="div-buton">
            <Link to ='/pokemons'>
            <button class="learn-more">
         <span aria-hidden="true" class="circle">
           <span class="icon arrow"></span>
          </span>
          <span class="button-text">Contiuar</span>
        </button>
            </Link>
            </div>
            <div className="img-div">
            <img className="logo2"src={pokegif} alt="Loading..." width="12%" />
            </div>
            </header>
        </div>
    )
}

export default Landing;