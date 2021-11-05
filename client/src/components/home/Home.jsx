import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemones, filterXtypes, getTypes, 
filterCreate, orderXname, orderXstrength } from '../../actions/index';
import { Link } from 'react-router-dom';
import Card from '../card/Pokecard';
import Pages from '../pages/Pages';
import SearchBar from '../searchBar/SearchBar';
import Nav from '../nav/Nav';
import pikachu from '../../img/pikagif.gif'
import './Home.css';


export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const types = useSelector((state) => state.types);

    const [currentPage, setCurrentPage] = useState(1)
    const [pokeXpage,] = useState(12)
    const indexOfLastPoke = currentPage * pokeXpage
    const indexOfFirsPoke = indexOfLastPoke - pokeXpage
    const currentPokemons = allPokemons.slice(indexOfFirsPoke, indexOfLastPoke)

    const pages = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    //estado para orderXname
    const[,setOrderName] = useState('');

    //estado para orderXstrength
    const[,setOrderStrength] = useState('');


    useEffect(() => {
        dispatch(getPokemones());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemones());
    }

    function handleFilterTypes(e) {
        dispatch(filterXtypes(e.target.value));
    }

    function handleFilterCreate(e) {
        dispatch(filterCreate(e.target.value));
    }

    function handleOrderName(e) {
        e.preventDefault(e);
        dispatch(orderXname(e.target.value));
        setCurrentPage(1);
        setOrderName(`Ordenado ${e.target.value}`)
    }

    function handleOrderStrength(e) {
        dispatch(orderXstrength(e.target.value));
        setOrderStrength(`Ordenado ${e.target.value}`)
    }
    

    return (
        <div className="home">
            <Nav />
            <div className="select">
                <div className="refres">
            <button className="btn5" onClick={(e) => {handleClick(e)}}>
                <p className="ref">Refresh Pokemons</p>
            </button>
            </div>
            <div className="letras">
            <select  className="desc" onChange={(e) => {handleOrderName(e)}}>
                    <option className="order">Order Alphabetically</option>
                    <option value='asc'>Ascendenet</option>
                    <option value='desc'>Descendente</option>
                </select>
                </div>
                <select className="fuerza" onChange={(e) => {handleOrderStrength(e)}}>
                    <option>Strength</option>
                    <option value='max'>Max Strength</option>
                    <option value='min'>Min Strength</option>
                </select>
                <select className="types" onChange={(e) => {handleFilterTypes(e)}}>
            <option value="All">Types</option>
            {types && types.map((el) => {
                return <option key={el.id} value={el.name}>{el.name}</option>
            })}
          </select>
                <select className="filter" onChange={(e) => {handleFilterCreate(e)}}>
                    <option>Filter Pokemons</option>
                    <option value="All">All Games</option>
                    <option value="Created">Created Games</option>
                    <option value="From Api">Api Games</option>
                </select>
                </div>
               
                <SearchBar />
                {
                    currentPokemons.length > 0?

                    currentPokemons?.map(el => {
                        return(
                            <div>
                                <Link to={`/pokemons/${el.id}`}>
                            <Card
                            name={el.name}
                            image={el.image}
                            types={el.createdInDB? el.types.map((e) => e.name).join(' ') : el.types.join(' - ')}
                            key={el.id}
                            />
                            </Link>
                            </div>  
                        )
                    })
                    :
                        <div className="div-loading2">
                         <img className="loading-img2" src={pikachu} alt='Not found' width="200px" height="200px" />
                         <p className="loading2">Loading...</p>
                         </div>
                }
                  <Pages
                pokeXpage={pokeXpage}
                allPokemons={allPokemons.length}
                pages={pages}
                />
            </div>
    )
}