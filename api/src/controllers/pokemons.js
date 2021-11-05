const axios = require('axios').default;
const { Pokemon, Types } = require('../db.js');
const { BASE_URL } = process.env;

const getPokemon = async () => {
    //entramos a la primer url que tiene el endpoints
   const oneEndpoint = await axios.get(`${BASE_URL}`)
   const dataEnd = oneEndpoint.data.results
   const twoEndpoint = await axios.get(oneEndpoint.data.next)
   const dataEndTwo = twoEndpoint.data.results
   const finalData = dataEnd.concat(dataEndTwo);
   //entramos a la url que tiene todos los elementos que necesitamos
   //despues de hacer la subrequest
   const getUrl = finalData.map(el => {
       return axios.get(el.url)
   })

   const finalUrl = await Promise.all(getUrl)
   const Data = finalUrl.map(el => {
    // console.log('data',finalUrl);
       const obj = {
           id: el.data.id,
           name: el.data.name,
           types: el.data.types.map(e => e.type.name),
           image: el.data.sprites.back_default,
           hp: el.data.stats[0].base_stat,
           attack: el.data.stats[1].base_stat,
           defense: el.data.stats[2].base_stat,
           speed: el.data.stats[5].base_stat,
           height: el.data.height,
           weight: el.data.height
       }
       return obj;
   })
   return Data;
   
}

//traemos lo de la DB
const getDB = async () => {
  return await Pokemon.findAll({
      include: {
          model: Types,
          attributes: ['name'],
          through: {
              attributes: [],
          },
      }
    })
};

module.exports = {
    getPokemon,
    getDB
}
// IMPORTANTE: Dentro de la Ruta Principal se deben mostrar tanto los 
// pokemons traidos desde la API como así también las de la base de datos. 
// Por otro lado, si revisan el endpoint que trae todos los pokemons verán 
// que no muestra la información del pokemon sino una URL para hacer un subrequest
//  y obtener los datos de allí. Tendrán que por cada pokemon que van a mostrar 
//  hacer otro request a esa URL para obtener su imagen y tipos. Debido a que esto 
//  puede hacer que la búsqueda sea muy lenta limitar el resultado total a 40 pokemons totales.