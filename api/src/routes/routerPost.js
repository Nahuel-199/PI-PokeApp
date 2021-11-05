const { Router } = require('express');
const { Pokemon, Types } = require('../db.js');
const router = Router();

router.post('/', async(req, res) => {
    let {
        name,
        id,
        image,
        types,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        createdInDB 
    } = req.body;

    const createPokemon = await Pokemon.create({
        name,
        id,
        image,
        types,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        createdInDB 
    });

    let typesDB = await Types.findAll({
        where: {
            name: types
        }
    });

    createPokemon.addTypes(typesDB);
    res.status(200).send("Pokemon created successfully")
});

module.exports = router;