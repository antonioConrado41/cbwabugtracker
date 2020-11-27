const db = require('../db')();
const COLLECTION = 'users';

module.exports = () => {

    const get = async (email = null) => {
        try {
            if (!email) {
                const user = await db.get(COLLECTION);
                return { user };
            }
            const user = await db.get(COLLECTION, { email });
            return { user };
        } catch (err) {
            console.log(err)
            return { error: err };
        }
    }

    const add = async (name, email, usertype, key) => {
        if(!name || !email || !usertype || !key){
            return {
                error: 'Provide all the fields ',
            }
        }
        try {
            const user = await db.get(COLLECTION, { email });
            if (user.length > 0) {
                return {
                    results: 'User already registered!',
                }
            }
            const results = await db.add(COLLECTION, {
                name: name,
                email: email,
                usertype: usertype,
                key: key,
            })

            return { results };
        } catch (err) {
            console.log(err)
            return { error: err };
        }
    }



    const getByKey = async (email, supliedKey) => {
        if (!supliedKey || !email) {
            return {
                error: "Missing Key or email! "
            }
        }
        try {
            const user = await db.get(COLLECTION, {
                email: email,
            })

            const verify = bcrypt.compareSync(supliedKey, user[0].key);
            if (!verify) {
                return {
                    error: "Wrong Password"
                };
            }
            return user[0];
        } catch (e) {
            return {
                error: e.message,
            }
        }
    }
    return {
        get,
        add,
        getByKey
    }
}
