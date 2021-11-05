import React from 'react'
import { Link } from 'react-router-dom';
import pokedex from '../../img/pikachu.png';
import './Nav.css';


export function Nav() {
    return (
        <div className="container-nav">
            <nav className="nav">
                  <div className="Logo"> 
                    <Link to="/"> <img className="Logo" alt="Not found" id="" src={pokedex} width="15px" /> </Link>
                </div> 
                <div>
                    <span className="span-poke">Welcome to the App Pokemons!</span>
                </div>
                <div className="poke-nav">
                    <Link to="/pokemons"><p className="home-nav">POKEMONS</p></Link>
                </div>
                <div className="CreatePoke">
                    <Link to="/createpokemon"><p className="create-nav">CREATE A POKEMON</p></Link>
                </div>
            </nav>
                <span id="span4"></span>
        </div>
    )
}

export default Nav;