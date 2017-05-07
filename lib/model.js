 const treatFieldsWithSchema = (schema={}) => {
    return  ( object, next ) => {
        let newObject = {}
        for( let index in schema ){
            newObject[index] = schema[index]( object[index] )
        }
        next(newObject)
    }
}

const addCreatedAt = (object, next) => {
    object.createdAt = new Date()
    next(object)
}

const createIdWithCollection = (collection) => {
    return ( object={}, next ) => {
        if( object.id ){
            next(Object.assign(object, {
                id: Number(object.id)
            }))
        } else {
            collection._count().then((result)=>{      
                object.id = result
                next(object)
            }).catch( console.log )
        }
    }
}

function ModelCreator (collection) {

    collection.middleweres = {} 

    collection.schema = {}

    collection.define_middlewere = ( action, fn ) => {
        collection.middleweres[action] = [
            ...collection.middleweres[action] || [],
            fn
        ]
    }
    
    collection.define_middleweres = ( action, fnArray ) => {
        collection.middleweres[action] = [
            ...collection.middleweres[action] || [],
            ...fnArray
        ]
    }

    collection.apply_middleweres = ( action ) => {
        return ( params ) => {
            return new Promise( (resolve) => {

                const chain = ( params , middleweres ) => {
                    if( middleweres.length ){
                        middleweres.shift()(params, (result) => {
                            chain(result, middleweres)
                        })
                    } else {
                        resolve(params)
                    }
                }

                chain( params , [...collection.middleweres[action]] )
            })
        }
    }

    collection.define_schema = (schema) => {
        collection.schema = schema
        collection.define_middleweres('insert', [
            treatFieldsWithSchema(schema),
            addCreatedAt,
            createIdWithCollection(collection) 
        ])
        collection.define_middleweres('find', [
        ])
        collection.define_middleweres('findOne', [
            createIdWithCollection(collection)
        ])
        return collection;
    }
    
    collection.has_many = (Model) => {
    }

    collection.belongs_to =  (Model) => {
    }

    collection.validate = (config) => {
    }
    
    collection.insert = (params) => {
        return new Promise( (resolve, reject) => {
            return collection.apply_middleweres('insert')(params).then( (result) => {
                return collection._insert(result).then(resolve).catch(reject);
            })
        })    
    }
    collection.find = (params) => {
        return new Promise( (resolve, reject) => {
            return collection.apply_middleweres('find')(params).then( (result) => {
                return collection._find(result).then(resolve).catch(console.log)
            })
        })
    } 
    collection.findOne = (params) => {
        return new Promise( (resolve, reject) => {
            return collection.apply_middleweres('findOne')(params).then( (result) => {
                return collection._findOne(result).then(resolve)
            })
        })
    }
    collection.remove = (params) => {
        return new Promise( (resolve, reject) => {
            return collection.apply_middleweres('remove')(params).then( (result) => {
                return collection._remove(result).then(resolve)
            })
        })
    }

    return collection

}

module.exports = ModelCreator
