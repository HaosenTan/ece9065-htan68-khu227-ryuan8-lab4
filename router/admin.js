const express = require('express');

const router = express.Router();

const admin_handler = require('../router_handler/admin');

router.get('/userNameLists', admin_handler.getUserName);

router.post('/adminGrant', admin_handler.getAdminGrant);

router.post('/adminDeactivation', admin_handler.deactivateUser);


module.exports = router;