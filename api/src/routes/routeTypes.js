const { Router } = require('express');
const { Types } = require('../db.js');
const axios = require('axios').default;
const router = Router();

router.get('/', async (req, res, next) => {
    try{
    const infoApityp = await axios.get('https://pokeapi.co/api/v2/type');
    const infoType = infoApityp.data.results.map(elem => elem.name);

    const createType = infoType.forEach(elem => {
      Types.findOrCreate({
        where: {name : elem}
         })
      });
    const typeFinal = await Types.findAll();
    res.send(typeFinal);}
    catch(error){next(error)}
  })

module.exports = router;