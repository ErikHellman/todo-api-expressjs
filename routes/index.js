var express = require('express');
var router = express.Router();

let todoItems = [
  {
    id: 1,
    title: 'First item',
    body: 'Content of first item.'
  },
  {
    id: 2,
    title: 'Second item',
    body: 'Content of second item.'
  },
  {
    id: 3,
    title: 'Third item',
    body: 'Content of third item.'
  },
];

/* 
GET /api/items - Get all todo items
GET /api/items/:id - Get single todo item
POST /api/items - Add new todo items
POST /api/items/:id - Update existing item
DELETE /api/items/:id - Delete existing item
 */

router.get('/api/items', function(req, res, next) {
  res.json(todoItems);
});

router.get('/api/items/:id', function(req, res, next) {
  
  const id = parseInt(req.params.id);
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = 'Invalid id';
    res.end('Invalid id');
  } else {
    const item = todoItems.find((item) => item.id === id);
    if (!item) {
      res.statusCode = 404;
      res.statusMessage = 'Not Found'
      res.end('Not found');
    } else {
      res.json(item);
    }  
  }
});

router.post('/api/items', (req, res, next) => {
  let highestId = 0;
  const latestItem = todoItems.forEach((item) => {
    if (item.id > highestId) {
      highestId = item.id;
    }
  });
  highestId += 1;

  const inputItem = req.body;

  const newItem = {
    'id': highestId,
    'title': inputItem.title,
    'body': inputItem.body
  }
  todoItems = [...todoItems, newItem];

  res.json(newItem);
});

router.delete('/api/items/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = 'Invalid id';
    res.end('Invalid id');
  } else {
    const item = todoItems.find((item) => item.id === id);
    if (!item) {
      res.statusCode = 404;
      res.statusMessage = 'Not Found'
      res.end('Not found');
    } else {
      // Delete from array
      todoItems = todoItems.filter((item) => item.id !== id);
      res.statusCode = 200
      res.end();
    }  
  }
});

module.exports = router;
