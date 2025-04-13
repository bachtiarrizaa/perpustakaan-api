const express = require('express');
const router = express.Router();
// const transactionController = require('../controllers/transaction');
const { mustLogin } = require('../middleware/authMiddleware');
const createLoan = require('../controllers/transaction/createLoan');
const getLoanHistoty = require('../controllers/transaction/getLoanHistory');

router.post('/create', mustLogin, createLoan);
router.get('/history', mustLogin, getLoanHistoty);

module.exports = router;