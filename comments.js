// Create web server
// Load express module
const express = require('express');
const app = express();
// Load body-parser
const bodyParser = require('body-parser');
// Load comments data
const comments = require('./comments-data.js');
// Load cors
const cors = require('cors');

app.use(cors());
// Use body-parser
app.use(bodyParser.json());

// Route: /comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// Route: /comments/:id
app.get('/comments/:id', function(req, res) {
  // Find the comment
  const comment = comments.find(function(comment) {
    return comment.id == req.params.id;
  });

  // If the comment is not found
  if (!comment) {
    res.status(404).json({ error: 'Comment not found' });
  } else {
    res.json(comment);
  }
});

// Route: /comments
app.post('/comments', function(req, res) {
  // Get the comment
  const comment = req.body;

  // Add the comment
  comments.push(comment);

  // Return the added comment
  res.json(comment);
});

// Route: /comments/:id
app.put('/comments/:id', function(req, res) {
  // Find the comment
  const comment = comments.find(function(comment) {
    return comment.id == req.params.id;
  });

  // If the comment is not found
  if (!comment) {
    res.status(404).json({ error: 'Comment not found' });
  } else {
    // Update the comment
    comment.name = req.body.name;
    comment.comment = req.body.comment;

    // Return the updated comment
    res.json(comment);
  }
});

// Route: /comments/:id
app.delete('/comments/:id', function(req, res) {
  // Find the comment
  const index = comments.findIndex(function(comment) {
    return comment.id == req.params.id;
  });

  // If the comment is not found
  if (index === -1) {
    res.status(404).json({ error: 'Comment not found' });
  } else {
    // Delete the comment
    comments.splice(index, 1);

    // Return the deleted comment
    res.json({ id: req.params.id });
  }
});

// Start the server
app.listen(3000, function() {
  console.log('Server is running