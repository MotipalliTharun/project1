const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

let blogPosts = [];

// Render the home page
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

// Render the about page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Render the contact page
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

// Render the blog page with all posts
app.get('/blog', (req, res) => {
  res.render('blog', { title: 'Blog', blogPosts });
});

// Render a specific blog post
app.get('/blog/:id', (req, res) => {
  const postId = req.params.id;
  const post = blogPosts[postId];
  res.render('post', { title: 'Blog Post', post });
});

// Render the services page
app.get('/services', (req, res) => {
  res.render('services', { title: 'Services' });
});

// Render the new post form
app.get('/new', (req, res) => {
  res.render('new', { title: 'New Post' });
});

// Handle the form submission for creating a new post
app.post('/new', (req, res) => {
  const { title, content } = req.body;
  const newPost = { title, content };
  blogPosts.push(newPost);
  res.redirect('/blog');
});

app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`);
});
