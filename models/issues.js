const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {

    const get = async (slug = null) => {
        try {
            if (!slug) {
                const issues = await db.get(COLLECTION);
                return { issues };
            }
            const issues = await db.get(COLLECTION, { slug });
            return { issues };
        } catch (err) {
            return {
                error: err,
            }
        }
    }

    const getByProjectId = async (issueNumber) => {
        try {
            let expression = new RegExp(issueNumber);
            const byProject = await db.get(COLLECTION, { slug: expression });
            return byProject;
        } catch (err) {
            return {
                error: err,
            }
        }
    }

    const add = async (slug, title, description, status, project_id) => {
        try {
            const counter = await db.count(COLLECTION);
            const results = await db.add(COLLECTION, {
                slug: `${slug}-${counter + 1}`,
                title: title,
                description: description,
                status: status,
                project_id: (project_id),
                comments: []
            })

            return results.result;
        } catch (err) {
            return {
                error: err
            }
        }
    }

    return {
        get,
        add,
        getByProjectId,
    }
}
