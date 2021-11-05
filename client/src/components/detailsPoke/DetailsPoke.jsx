import React from 'react';
import { useHistory } from 'react-router-dom';
import { getDetail, deletePokemon } from '../../actions';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import pikachu from '../../img/pikagif.gif'
import './detailsPoke.css';

export default function DetailsPoke(props) {
     const dispatch = useDispatch()

     const [detail, setDetail] = useState([]);
     const history = useHistory();

     useEffect(() =>{
         dispatch(getDetail(props.match.params.id));
     },[dispatch])

     function handleDetails(e) {
         e.preventDefault()
         setDetail(getDetail(detail))
         history.push('/pokemons')
     }

     function handleDelete(e) {
         dispatch(deletePokemon(props.match.params.id));
         history.push('/pokemons');
         window.location.replace('');
     }

     const myPoke = useSelector((state) => state.details)

     return(
         <div className="container-detail">
             {
                 myPoke.length > 0?
                 <div className="details">
                     <div className="card-2">
                         <div className="circle-2">
                         <img className="img-detail" src={myPoke[0].image} alt ="img Not Found" width="200px" height="250px" />
                             </div>
                             <div className="content-2">
                     <h1 className="name-detail">{myPoke[0].name.toUpperCase()}</h1>
                    <div className="type-todo">
                     <h3 className="type-poke">Types: {myPoke[0].types.map(el => {
                         return (el.name ?
                            <div className="type-name">{el.name}</div>
                            : <div>{el}</div>
                            )
                     })}
                     </h3>
                     <h3 className="number-detail">Number: {`"${myPoke[0].id}"`}</h3>
                     <p className="life-detail">Life: {myPoke[0].hp}</p>
                     <p className="defense-detail">Defense: {myPoke[0].defense}</p>
                     <p className="speed-detail">Speed: {myPoke[0].speed}</p>
                     <h4 className="heigth-detail">Heigh: {myPoke[0].height}</h4>
                     <h4 className="weigth-detail">Weight: {myPoke[0].weight}</h4>
                     </div>
                     </div>
                     </div>
                     </div> :
                     <div className="div-loading">
                         <img className="loading-img" src={pikachu} alt='Not found' width="200px" height="200px" />
                         <p className="loading">Loading...</p>
                         </div>
             }
            
                 <button className="button-detail" onClick={(e) => handleDetails(e)}>BACK</button>
            
             <div className="delete-detail">
             <button className="btn7 btn-7" onClick={(e) => {
                 const confirmBox = window.confirm('Do you really want to delete this Pokemon?');
                 if(confirmBox === true) {
                     handleDelete(e)
                 }
             }}>X</button>
            </div>
         </div>
     )
}