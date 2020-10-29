const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () =>{

    const get = async (email = null) =>{
        if(!email){
            const users = await db.get(COLLECTION);
            return users;
        }
            const oneUser = await db.get(COLLECTION, {email});
            return oneUser;
    }
        
    const addComment = async(issueNumber, text, author) =>{
        const PIPELINE = [{slug : issueNumber}, {$push:{comments: {
            _id: new ObjectID(),
            text: text,
            author: author,

        }}}]
        const results = await db.update(COLLECTION, PIPELINE);

        return results.result;
    }

        return {
            get,
            addComment
        }
    }
