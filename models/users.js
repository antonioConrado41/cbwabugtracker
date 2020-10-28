const db = require('../bd')();
const COLLECTION = 'users';

module.exports = () =>{

    const get = async (email = null) =>{
        if(!email){
            const users = await db.get(COLLECTION);
            return allUsers;
        }else{
            const oneUser = await db.get(COLLECTION, {email});
            return oneUser;
        } 
        
    const add = async(name, email, usertype, key) =>{
        const results = await db.add(COLLECTION, {
            name: name,
            email: email,
            usertype: usertype,
            key: key,
        })

        return results.result;
    }

        return {
            get,
        }
    }
}