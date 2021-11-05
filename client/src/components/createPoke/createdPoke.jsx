import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postPoke, getTypes } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import './createdPoke.css';

export default function CreateGames() {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types)
    const history = useHistory();
    console.log('create', types)

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed:"",
        height:"",
        weight:"",
        types: []
    });

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = "Name is Required"
        }else if (!input.image) {
            errors.image = "Image is Required"
        }else if (!input.hp) {
            errors.hp = "Life is Required"
        }else if (!input.attack) {
            errors.attack = "Attack is Required"
        }else if (!input.defense) {
            errors.defense = "Defense is Required"
        }else if (!input.height) {
            errors.height = "Height is Required"
        }else if (!input.weight) {
            errors.weight = "Weight is Required"
        }
            return errors;
    
    };

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        console.log('input',input)
    }

    function handleSelect(e) {
        if (input.types.includes(e.target.value)){
            alert("You already selected this types. Try again.");
        } else if (input.types.length >= 3) {
            alert("You can selecte up to 3 types.")
        } else {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
       }
    };

    function handleDelete(i) {
        setInput({
            ...input,
            types: input.types.filter(el => el !== i)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(errors).length > 0) {
            alert('Missing Data to Send Form')
        }
        else {
            dispatch(postPoke(input));
            alert('Pokemon Created');
            setInput({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed:"",
        height:"",
        weight:"",
        types: []
            })
            history.push('/pokemons')
        }
    }


    return (
        <div className="container-formulario">
            <h1>Create your Pokemon</h1>
            <Link to='/pokemons' >
                        <button className="salida">❌</button>
                    </Link>
            <form className="formulario" onSubmit={(e) => handleSubmit(e)} onKeyPress={(e) => {
                if (e.key === "Enter") {
                    handleSubmit(e)
                }
            }}
                autoComplete="off"> 
                <div className="div">
                    <label className="label">Name:</label>
                    <input
                        className="input"
                        type='text'
                        placeholder='Name...'
                        value={input.name}
                        name="name"
                        onChange={(e) => { handleChange(e) }}
                    />
                    {errors.name && (
                        <p className='danger'>{errors.name}</p>
                    )} 
                </div>
                <div className="div">
                    <label className="label">Image:</label>
                    <input
                       className="input"
                        type='text'
                        placeholder='Image url...'
                        value={input.image}
                        name='image'
                        onChange={(e) => { handleChange(e) }}
                    />
                     {errors.image && (
                        <p className='danger'>{errors.image}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Life:</label>
                    <input
                        className="input"
                        type='number'
                        min="0"
                        max="150"
                        placeholder='Life...'
                        value={input.hp}
                        name='hp'
                        onChange={(e) => { handleChange(e) }}
                    />
                      {errors.hp && (
                        <p className='danger'>{errors.hp}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Attack:</label>
                    <input
                        className="input"
                        type='number'
                        min="0"
                        max="150"
                        placeholder='Attack...'
                        value={input.attack}
                        name='attack'
                        onChange={(e) => { handleChange(e) }}
                    />
                     {errors.attack && (
                        <p className='danger'>{errors.attack}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Defense:</label>
                    <input
                        className="input"
                        type='number'
                        min="0"
                        max="150"
                        placeholder='Defense...'
                        value={input.defense}
                        name='defense'
                        onChange={(e) => { handleChange(e) }}
                    />
                       {errors.defense && (
                        <p className='danger'>{errors.defense}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Speed:</label>
                    <input
                        className="input"
                        type='number'
                        placeholder='Speed...'
                        value={input.speed}
                        name='speed'
                        onChange={(e) => { handleChange(e) }}
                    />
                </div>
                <div className="div">
                    <label className="label">Height:</label>
                    <input
                        className="input"
                        type='number'
                        min="0"
                        max="150"
                        placeholder='Height...'
                        value={input.height}
                        name='height'
                        onChange={(e) => { handleChange(e) }}
                    />
                     {errors.height && (
                        <p className='danger'>{errors.height}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Weight:</label>
                    <input
                        className="input"
                        type='number'
                        placeholder='Weight...'
                        value={input.weight}
                        name='weight'
                        onChange={(e) => { handleChange(e) }}
                    />
                     {errors.weight && (
                        <p className='danger'>{errors.weight}</p>
                    )}
                </div>
                <div className="div-types2">
                    <label className="label">Types:</label>
                    <select
                    className="select2"
                     onChange={(e) =>
                        handleSelect(e)}>
                        {types.map((el) => (
                            <option className="options" key={el.id} value={el.name}>{el.name}</option>
                        ))}
                    </select>
                    <ul className="typos">
                        {input.types.map((el, i) =>
                            {
                                return <div className="buton-div" key={i}>
                                    <li>{el}</li>
                                    <buton className="buton-form" onClick={() => { handleDelete(el); } }>❌</buton>
                                </div>;
                            }
                        )}
                    </ul>
                </div>
    
                    <button className="type-submit" onClick={(e) => { handleSubmit(e)}}>
                        CREATE
                        </button>
            </form>
        </div>
    )
}
