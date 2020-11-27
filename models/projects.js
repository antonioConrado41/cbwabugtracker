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
    try {
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
