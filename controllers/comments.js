const comments = require('../models/comments')();

module.exports = () =>{

    const getController = async(req, res) =>{
        res.json(await comments.get());
    }
    const getByEmail = async(req, res) =>{
        res.json(await comments.get(req.params.email));
    }

    const postComment = async(req, res) => {
       let issueNumber = req.params.issueNumber;
       let text = req.body.text;
       let author = req.body.author;

        const result = await comments.addComment(issueNumber, text, author);
        res.json(result);
    }

    return{
        getByEmail,
        getController,
        postComment,
    }

}