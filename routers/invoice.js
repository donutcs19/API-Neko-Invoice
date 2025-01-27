const express = require('express');
const router = express.Router()

const { remove } = require('../controllers/invoice');

router.put('/deleteBill', remove);

module.exports = router;