const users = require('../models/users')();

module.exports = () => {

    const getController = async (req, res) => {
        const { user, error } = await users.get();
        if (error) {
            res.status(500).json({
                error,
            })
        }
        res.json(user);
    }
    const getByEmail = async (req, res) => {
        const { user, error } = await users.get(req.params.email);
        if (error) {
            res.status(500).json({
                error,
            })
        }
        res.json(user);
    }

    const postController = async (req, res) => {
        let { name, email, usertype, key } = req.body;
        const { results, error } = await users.add(name, email, usertype, key);
        if (error) {
            res.status(500).json({
                error,
            })
        }
        res.json(results);
    }

    return {
        getByEmail,
        getController,
        postController,
    }

}