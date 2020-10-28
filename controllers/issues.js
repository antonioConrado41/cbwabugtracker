const issues = require('../models/issues')();

module.exports = () =>{

    const getController = async(req, res) =>{
        res.json(await issues.get());
    }
    const getBySlug = async(req, res) =>{
        res.json(await issues.get(req.params.slug));
    }

    const postController = async(req, res) => {

        let slug = req.params.slug;
        let title = req.body.title;
        let description = req.body.description;
        let status = req.body.status;
        let project_id = req.body.project_id;

        const result = await issues.add(slug, title, description, status, project_id);
        res.json(result);
    }

    return{
        getBySlug,
        getController,
        postController,
    }

}