const { Router } = require('express');
const { getPokemon, getDB } = require('../controllers/pokemons');
const { Pokemon } = require('../db.js');
const router = Router();

//concatenasion de las info API/DB
const totalPokemons = async () => {
    const infoApi = await getPokemon();
    const infoDB = await getDB();
    const infoTotal = infoDB.concat(infoApi)
    return infoTotal;
    
};

//RUTAS
//Traemos todos los pókemons y buscamos por query?
router.get('/', async (req, res) => {
    let pokemon = await totalPokemons();
    const name = req.query.name;
    if (name) {
      let pokeNames = await pokemon.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      pokeNames.length
        ? res.status(200).send(pokeNames)
        : res.status(404).send("The game you are looking for cannot be Found");
    } else {
      res.status(200).send(pokemon);
    }
  });
   
  //traemos el pokemons por ID
  router.get('/:id', async(req, res, next) => {
    const id = req.params.id;
  try {
    const filerXid = await totalPokemons();
    if (id) {
      let pokemonId = filerXid.filter(elem => elem['id'] == id) //[id] porque es un [{}]
      pokemonId.length ? 
      res.status(200).json(pokemonId) : 
      res.status(404).send('The id You looking for cannot be Found');
    }
  }
  catch (error) { next(error) }
});

//metodo extra Delete

router.delete('/:id', async(req, res) => {
    const {
        id
    } = req.params.id;
    const deletePoke = await Pokemon.findOne({
        where: {
            id: id
        }
    })
    await deletePoke.destroy();
    res.status(200).send("Pokemon Deleted Successfully")
});


module.exports = router;