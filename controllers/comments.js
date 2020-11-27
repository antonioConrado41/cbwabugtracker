const comments = require('../models/comments')();

module.exports = () =>{

    const getAll = async(req, res) =>{
        const {getComment, error} = await comments.getCommentsForIssue(req.params.issueNumber)
        if(error){
            res.status(500).json({
                error,
            })
        }
        res.json(getComment);
    }

    const getComment = async(req, res)=>{
        const {comment, error} = await comments.getOneComment(req.params.commentId)
        if(error){
            res.status(500).json({
                error,
            })
        }
        res.json(comment)
    }

    const postComment = async(req, res) => {
        const {issueNumber, text, author} = req.body;
        const {result, error} = await comments.addComment(issueNumber, text, author);
        if(error){
            res.status(500).json({
                error,
            })
        }
        res.json(result);
    }

    return{
        getAll,
        getComment,
        postComment,
    }

}