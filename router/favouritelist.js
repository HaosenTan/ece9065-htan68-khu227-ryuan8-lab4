const express = require('express');

const router = express.Router();

const genres_handler = require('../router_handler/favouritelist');

router.post('/addfavouritelist', genres_handler.addfavouritelist);

router.post('/savefavouritelist', genres_handler.savefavouritelist);

router.get('/searchfavouritelist/:list_name', genres_handler.searchfavouritelist);


module.exports = router;