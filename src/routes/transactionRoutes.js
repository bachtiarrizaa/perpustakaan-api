const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction');
const { mustLogin } = require('../middleware/authMiddleware');

router.post('/loan', mustLogin, transactionController.createLoan);
router.get('/history', mustLogin, transactionController.getLoanHistoty);
router.post('/return', mustLogin, transactionController.createReturn);

module.exports = router;