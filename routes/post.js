const express = require('express');
const Post = require('../models/Post.js');
const route = express.Router();

route.get('/', (req, res) => {
  const allPost = Post.find();
  allPost.then(data => res.json(data))
  .catch(error => res.json({message: error}))
});

route.get('/:id', async (req, res) => {
  try {
    const specPost = await Post.findById(req.params.id);
    res.json(specPost);
  } catch(error){
    res.json({message: error})
  }
});

route.post('/', (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  post.save()
  .then(data => res.json(data))
  .catch(error => res.json({message: error}))
});

route.delete('/:id', (req,res) => {
  Post.deleteOne({_id: req.params.id})
  .then(data => res.json(data))
  .catch(error => res.json({message: error}))
});

route.patch('/:id', async (req, res) => {
  try{
    const updatedPost = await Post.updateOne({_id: req.params.id}, {description: req.body.description});
    res.json(updatedPost);
  } catch(error){
    res.json({message: error})
  }
})
module.exports = route;


