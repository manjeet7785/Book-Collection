const express = require('express');
const { handlebook, handlebookLists, handlebookDelete, handlebookUpdate, allBooks } = require('../Controller/BookController');

const router = express.Router();

router.get('/', allBooks);
router.post('/addbook', handlebook);
router.get('/booklist', handlebookLists);
router.delete('/book/:id', handlebookDelete);
router.put('/book/:id', handlebookUpdate);

module.exports = router;