import React from 'react';
import './pages.css';

export default function Pages({ pokeXpage, allPokemons, pages }) {
    const pageNumber = []

    for (let i = 0; i <= Math.ceil(allPokemons / pokeXpage); i++) {
        pageNumber.push(i + 1);
    }

    return (
        <div className="container-pages">
        <nav className="pages">
            <ul className="number"> {pageNumber?.map((number, index) => {

                return (<li className="pag" key={index} onClick={() => pages(number)}>{number}</li>
                  )
               })
            }
            </ul>
        </nav>
        </div>

    )
}