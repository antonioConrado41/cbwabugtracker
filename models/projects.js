const db = require('../db')();
const COLLECTION = 'projects';

module.exports = () => {
    const get = async (slug = null) => {
        if (!slug) {
            try {
                const slug = await db.get(COLLECTION);
                return { slug };
            } catch (err) {
                console.log(err)
                return {
                    error: err,
                };
            }
        }

        try {
            const slug = await db.get(COLLECTION, {
                slug: slug,
            });
            return { slug };
        } catch (err) {
            console.log(err)
            return { error: err };
        }
    }

const add = async (slug, name, description) => {
    if(!slug || !name || !description){
        return {
            error: 'Provide all the fields ',
        }
    }
    try {
        const slugName = await db.get(COLLECTION, {
            slug: slug,
        });

        if (slugName.length > 0){
            return{
                result: 'Project already exists!',
            }
        }
        const results = await db.add(COLLECTION, {
            slug,
            name,
            description,
        });
        return results.result;
    } catch (err) {
        console.log(err)
        return {
            error: err
        };
    }
}


return {
    get,
    add,
}
 }
