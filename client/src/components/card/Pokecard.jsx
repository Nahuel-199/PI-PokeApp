import React from 'react';
import './Pokecard.css';

export default function Card({ name, image, types }) {
    return(
        <div className="todo">
        <div className="container-poke">
        <div className="card">
            <div className="circle">
            <img className="img" src={image} alt="img Not Found" width="100px" height="100px" />
            </div>
        <div className="content">
            <p>{name}</p>
            </div>
            <div className="div-types">
            <p className="types-card">{types}</p>
            </div>
        </div> 
        </div>
        </div>
    );
}