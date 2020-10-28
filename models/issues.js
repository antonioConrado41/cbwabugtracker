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
        
    const add = async(slug, title, description, status, project_id) =>{
        const counter = await db.count(COLLECTION);
        const results = await db.add(COLLECTION, {
           slug: `${slug}-${counter +1}`,
           title: title,
           description: description,
           status: status,
           project_id: (project_id),
           comments:[]
        })

        return results.result;
    }

        return {
            get,
            add
        }
    }
