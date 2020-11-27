const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {

    const getCommentsForIssue = async (issueNumber) => {
        try {
            const PIPELINE = [
                { $match: { "slug": issueNumber } },
                {
                    $project: {
                        comments: 1,
                        _id: 0,
                        issueNumber: 1
                    }
                }
            ]
            const getComment = await db.aggregate(COLLECTION, PIPELINE);
            return { getComment };
        } catch (err) {
            return {
                error: err
            }
        }
    }

    const getOneComment = async (commentId) => {
        try {
            const PIPELINE = [
                { $match: { 'comments._id': ObjectID(commentId) } },
                {
                    $project: {
                        comments: {
                            $filter: {
                                input: '$comments',
                                as: 'comment',
                                cond: { $eq: ['$$comment._id', ObjectID(commentId)] }
                            }
                        },
                        _id: 0,
                        issueNumber: 1
                    }
                }
            ]
            const comments = await db.aggregate(COLLECTION, PIPELINE);
            return { comments };
        } catch (err) {
            return {
                error: err
            }
        }
    }



    const addComment = async (issueNumber, text, author) => {
        try {
            const PIPELINE = [{ slug: issueNumber }, {
                $push: {
                    comments: {
                        _id: new ObjectID(),
                        text: text,
                        author: author,

                    }
                }
            }]
            const results = await db.update(COLLECTION, PIPELINE);

            return results.result;
        } catch (err) {
            return {
                error: err
            }
        }
    }

return {
    getCommentsForIssue,
    addComment,
    getOneComment
}
    }
