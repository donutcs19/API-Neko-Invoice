const express = require('express');
const router = express.Router()

const { createUser, lastLogin ,checkUser, listOrganize, listPosition } = require('../controllers/signin');

router.get('/', (req, res) => {
    res.send('Hello login');
})

router.post('/createUser', createUser)
router.put('/lastLogin', lastLogin)
router.post('/checkUser', checkUser)
router.get('/listOrganize', listOrganize)
router.get('/listPosition', listPosition)

module.exports = router;