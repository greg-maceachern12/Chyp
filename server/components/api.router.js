const express = require('express');
const router = express.Router();
const events = require('./events/event.router');
const users = require('./users/user.router');

router.use('/events', events);
router.use('/users', users);



module.exports = router;
