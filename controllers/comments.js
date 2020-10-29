const comments = require('../models/comments')();

module.exports = () =>{

    const getAll = async(req, res) =>{
        res.json(await comments.getCommentsForIssue(req.params.issueNumber))
    }

    const getComment = async(req, res)=>{
        res.json(await comments.getOneComment(req.params.commentId))
    }

    const postComment = async(req, res) => {
       let issueNumber = req.params.issueNumber;
       let text = req.body.text;
       let author = req.body.author;

        const result = await comments.addComment(issueNumber, text, author);
        res.json(result);
    }

    return{
        getAll,
        getComment,
        postComment,
    }

}