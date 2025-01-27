const express = require('express');
const router = express.Router()

const { listInvoiceUser, createInvoice } = require('../controllers/user');

router.get('/listInvoiceUser/:id', listInvoiceUser)
router.post('/createInvoice', createInvoice)

module.exports = router;