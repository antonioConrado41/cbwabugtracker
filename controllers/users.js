const users = require('../models/users')();

module.exports = () =>{

    const getController = async(req, res) =>{
        res.json(await users.get());
    }
    const getByEmail = async(req, res) =>{
        res.json(await users.get(req.params.email));
    }

    return{
        getByEmail,
        getController,
    }

}