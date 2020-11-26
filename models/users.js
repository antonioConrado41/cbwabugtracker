const db = require('../db')();
const COLLECTION = 'users';

module.exports = () =>{

    const get = async (email = null) =>{
        try{
        if(!email){
            const user = await db.get(COLLECTION);
            return {user};
        }
            const user = await db.get(COLLECTION, {email});
            return {user};
    }catch(err){
        console.log(err)
        return {error: err};
    }
}
        
    const add = async(name, email, usertype, key) =>{
        const results = await db.add(COLLECTION, {
            name: name,
            email: email,
            usertype: usertype,
            key: key,
        })

        return {results};
    }


    const getByKey = async(key) =>{
        try{
        if(!key){
            console.log('Missing Key')
            return null;
        }
        const users = await db.get(COLLECTION, {key})

        if(users.length !==1){
            console.log('bad key')
        }
        return users[0];
    }catch(e){
        return {error: e}
    }
    }
        return {
            get,
            add,
            getByKey
        }
    }
