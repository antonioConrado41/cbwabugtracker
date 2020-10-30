const express = require('express');
const bodyParser = require('body-parser');

const users = require('./controllers/users')();
const usersModel = require('./models/users')();
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues')();
const comments = require('./controllers/comments')();

const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
const app = (module.exports = express());

app.use(async(req, res, next)=> {
    const failedAuth = {
        error: 'Failed',
        message: 'Not authorized',
        code: 'xxx'
    }

    const suppliedKey = req.headers['x-api-key'];
    const clientIp = req.headers['x-forwarded-for'] || res.connection.remoteAddress;

    if(!suppliedKey){
        console.log('Failed authentication, no key supplied');
        new Date();
        clientIp

        failedAuth.code = '01';
        return res.status(401).json(failedAuth);
    }

    const user = await usersModel.getByKey(suppliedKey);

    if(!user){
        failedAuth.code = '02';
        return res.status(401).json(failedAuth);
    }

    next();
})

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

app.get('/issues/:issueNumber/comments', comments.getAll);
app.get('/issues/:issueNumber/comments/:commentId', comments.getComment);
app.post('/issues/:issueNumber/comments', comments.postComment);


app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.listen(port,hostname, ()=>{
    console.log(`App listening at http://${hostname}:${port}`);
})

app.use((req, res)=>{
    res.status(404).json({
        error: 404,
        message: 'Not found',
    })
})