const express = require('express');
const bodyParser = require('body-parser');

const users = require('./controllers/users')();
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues')();

const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
const app = (module.exports = express());

app.use(bodyParser.json());

app.get('/users', users.getController);
app.get('/users/:email', users.getByEmail);
app.post('/users', users.postController);


app.get('/projects', projects.getController);
app.get('/projects/:slug', projects.getBySlug);
app.post('/projects', projects.postController);

app.get('/projects/:slug/issues', issues.getByProject);
app.get('/issues', issues.getController);
app.get('/issues/:slug', issues.getByIssue);
app.post('/projects/:slug/issues', issues.postController);

app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.listen(port,hostname, ()=>{
    console.log(`App listening at http://${hostname}:${port}`);
})