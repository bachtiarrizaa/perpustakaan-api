const express = require('express');
const router = express.Router();
// const transactionController = require('../controllers/transaction');
const { mustLogin } = require('../middleware/authMiddleware');
const createLoan = require('../controllers/transaction/createLoan');

router.post('/create', mustLogin, createLoan);

module.exports = router;