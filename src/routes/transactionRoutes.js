const express = require('express');
const router = express.Router();
// const transactionController = require('../controllers/transaction');
const { mustLogin } = require('../middleware/authMiddleware');
const createLoan = require('../controllers/transaction/createLoan');
const getLoanHistoty = require('../controllers/transaction/getLoanHistory');
const returnLoan = require('../controllers/transaction/returnLoan');

router.post('/create', mustLogin, createLoan);
router.get('/history', mustLogin, getLoanHistoty);
router.put('/return/:loanId', mustLogin, returnLoan);

module.exports = router;