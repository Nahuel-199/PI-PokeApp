import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePoke } from '../../actions';
import './SearchBar.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState();

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getNamePoke(name))
    }

    function cleanState(e) {
        e.preventDefault()
        window.location.replace('')
    }

    return (
        <div className="conteiner-search">
            <input
            className="input-search"
            type='text'
            placeholder='Search...'
            onChange= {(e) => handleInputChange(e)}
            />
            <div className="buton">
            <button className="boton1" type='submit' 
            onClick= {(e) => {handleSubmit(e)}}>
                ▶
            </button>
            </div>
            <div className="buton2">
            <button className="boton2" type='submit'
            onClick={(e) => cleanState(e)}>❌</button>
            </div>
             </div>
    )
}