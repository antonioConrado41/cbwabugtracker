const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;
const MONGO_OPTIONS = {useUnifiedTopology: true, useNewUrlParser: true};
const DB_NAME = 'cbwa-ca';

module.exports = () =>{
    const get = (collectionName, query={}) =>{
        return new Promise((resolve, reject) =>{
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) =>{
                
                if(err){
                    console.log(err);
                    return reject('.............CONNECTION...FAILED................');
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                collection.find(query).toArray((err, docs)=> {
                    if(err){
                        console.log(err);
                        return reject('.............NOT...FOUND................');
                    }
                resolve(docs);
                client.close();

                })
            })
        }) 
    }

    const add = (collectionName, item ) =>{
        return new Promise((resolve, reject) =>{
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) =>{
                if(err){
                    console.log(err);
                    return reject('.............CONNECTION...FAILED................');
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                collection.insertOne(item, (err, result)=>{
                    if(err){
                        console.log(err);
                        return reject('.............FAILED..TO..ADD................');
                    }
                    resolve(result);
                    
                    client.close();
                })
                })
            })
    }

    const count = (collectionName) =>{
        return new Promise((resolve, reject) =>{
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) =>{
                if(err){
                    console.log(err);
                    return reject('.............CONNECTION...FAILED................');
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                collection.countDocuments({}, (err, result)=>{
                    if(err){
                        console.log(err);
                        return reject('.............COUNT...FAILED................');
                    }
                    resolve(result);
                    client.close();
                })
                })
            })
    }

    const update = (collectionName, pipeline ) =>{
        return new Promise((resolve, reject) =>{
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) =>{
                if(err){
                    console.log(err);
                    return reject('.............CONNECTION...FAILED................');
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                collection.updateOne(pipeline[0],pipeline[1], (err, result)=>{
                    if(err){
                        console.log(err);
                        return reject('.............UPDATE...FAILED................');
                    }
                    resolve(result);
                    
                    client.close();
                })
                })
            })
    }

    const aggregate = (collectionName, pipeline=[]) =>{
        return new Promise((resolve, reject) =>{
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) =>{
                if(err){
                    console.log(err);
                    return reject('.............CONNECTION...FAILED................');
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                collection.aggregate(pipeline).toArray((err, docs)=> {
                    if(err){
                        console.log(err);
                        return reject('.............AGGREGATE...FAILED................');
                    }    
                resolve(docs);
                client.close();

                })
            })
        }) 
    }

    return {
        get,
        add,
        count,
        update,
        aggregate
    }
    
}
