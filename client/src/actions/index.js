import axios from 'axios';

//traemos los pokemones
export function getPokemones() {
    return async function(dispatch) {
        let res = await axios.get(
            "http://localhost:3001/pokemons",{
         });
         return dispatch({
             type: 'GET_POKEMONS',
             payload: res.data
         });
    }
}

//traemos las types
export function getTypes() {
    return async function(dispatch) {
        try{
        let response = await axios.get(
            "http://localhost:3001/types",{
       });
       return dispatch({
           type: 'GET_TYPES',
           payload: response.data
       });
      }catch (err) {
          return {
              error: "Can't Fetch Types",
              originalError: err
          }
      }
    }
};

//traemos la query para el search
export function getNamePoke(name) {
    return async function(dispatch){
        try{
            let res = await axios.get(
                'http://localhost:3001/pokemons?name=' + name
            )
            return dispatch({
                type: "GET_NAME_POKE",
                payload: res.data
            })
        }catch (error) {
            return{
            error: "Pokemons not Found",
            originalError: error
            }
        }
    }
}

//traemos el id para el detalle del pokemon
export function getDetail (id) {
    return async function(dispatch) {
        try{
            const res = await axios.get(
                'http://localhost:3001/pokemons/' + id
            );
            return dispatch({
                type: "GET_DETAILS",
                payload: res.data
            })
        }catch (err) {
            return {
                error: "id not Found",
                originalError: err
            }
        }
    }
}

//createdpoke
export function postPoke(payload) {
    return async function() {
        try{
            let res = await axios.post(
                "http://localhost:3001/created",payload
            );
            return res;
        } catch (err) {
            return {
                error: "Can't Create Pokemon",
                originalError: err
            }
        }
    }
}

//metodo extra delete pokemon 
export function deletePokemon(id) {
    return async function() {
        try {
            let res = await axios.delete(
                `http://localhost:3001/pokemons/${id}`
            );
            return res.data;
        } catch (err) {
            return {
                error: "Can't Delete Pokemon",
                originalError: err
            }
        }
    }
};

//filtroXtypes
export function filterXtypes(payload) {
    return {
        type: 'FILTER_BY_TYPES',
        payload
    };
};

//filtroXcreatedInDB
export function filterCreate(payload) {
    return {
        type: 'FILTER_CREATE',
        payload
    };
};

//orderXname
export function orderXname(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    };
};

//orderXstrength
export function orderXstrength(payload) {
    return {
        type: 'ORDER_BY_STRENGTH',
        payload
    };
};
    