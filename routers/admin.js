const express = require('express');
const router = express.Router()

const { listInvoiceAdmin, listInvoiceDelete, listUser, updateStatus, updateRole, listStatus, listRole, addPosition, addOrganize } = require('../controllers/admin');

router.get('/listInvoiceAdmin/:org', listInvoiceAdmin)
router.get('/listInvoiceDelete/:org', listInvoiceDelete)
router.get('/listUser/:org', listUser)
router.put('/updateStatus', updateStatus)
router.put('/updateRole', updateRole)
router.get('/listStatus', listStatus)
router.get('/listRole', listRole)
router.post('/addPosition', addPosition)
router.post('/addOrganize', addOrganize)

module.exports = router;