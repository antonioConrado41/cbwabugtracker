const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () =>{

    const get = async (slug = null) =>{
        if(!slug){
            const allIssues = await db.get(COLLECTION);
            return allIssues;
        }
            const singleIssue = await db.get(COLLECTION, {slug});
            return singleIssue;
    }

    const getByProjectId = async (issueNumber) =>{
        let expression = new RegExp(issueNumber);
        const byProject = await db.get(COLLECTION, {slug: expression});
        return byProject;

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
            add,
            getByProjectId,
        }
    }
