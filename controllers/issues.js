const issues = require('../models/issues')();

module.exports = () =>{

    const getController = async(req, res) =>{
        const {issues, error} = await issues.get()
        if(error){
            res.status(500).json({
                error,
            })
        }
        res.json(issues);
    }
    const getByIssue = async(req, res) =>{
        const {issues, error} = await issues.get(req.params.slug)
        if(error){
            res.status(500).json({
                error,
            })
        }
        res.json(issues);
    }

    const getByProject = async(req, res) =>{
        const {issues, error} = await issues.getByProjectId(req.params.slug)
        if(error){
            res.status(500).json({
                error,
            })
        }
        res.json(issues);
    }

    const postController = async(req, res) => {

        let slug = req.params.slug;
        let title = req.body.title;
        let description = req.body.description;
        let status = req.body.status;
        let project_id = req.body.project_id;

        const result = await issues.add(slug, title, description, status, project_id);
        if(error){
            res.status(500).json({
                error,
            })
        }
        res.json(result);
    }

    return{
        getByIssue,
        getController,
        postController,
        getByProject,
    }

}