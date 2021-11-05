const { Router } = require('express');
// const express = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const routerPokemon = require('./routePokemons');
const routerTypes = require('./routeTypes');
const routerCreated = require('./routerPost')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', routerPokemon);
router.use('/types', routerTypes);
router.use('/created', routerCreated)

module.exports = router;
