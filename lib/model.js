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
            collection.count().then((result)=>{      
                object.id = result
                next(object)
            }).catch( console.log )
        }
    }
}

module.exports = class Model {

    constructor( collection ){
        this.middleweres = {}
        this.collection = collection;
    }

    define_middlewere( action, fn ){
        this.middleweres[action] = [
            ...this.middleweres[action] || [],
            fn
        ]
    }
    
    define_middleweres( action, fnArray ) {
        this.middleweres[action] = [
            ...this.middleweres[action] || [],
            ...fnArray
        ]
    }

    apply_middleweres( action ) {
        return ( params ) => {
            return new Promise( (resolve) => {
                const chain = ( params , middleweres ) => {
                    if( middleweres.length ){
                        middleweres.shift()(params, result => chain(result, middleweres))
                    } else {
                        resolve(params)
                    }
                }
                chain( params , [...this.middleweres[action]] )
            })
        }
    }

    define_schema (schema) {
        this.schema = schema
        this.define_middleweres('insert', [
            treatFieldsWithSchema(schema),
            addCreatedAt,
            createIdWithCollection(this.collection) 
        ])
        this.define_middleweres('find', [
        ])
        this.define_middleweres('findOne', [
            createIdWithCollection(this.collection)
        ])
        return this;
    }
    
    has_many (Model){
    }

    belongs_to  (Model){
    }

    validate (config){
    }
    
    insert (params){
        return new Promise( (resolve, reject) => {
            return this.apply_middleweres('insert')(params).then( (result) => {
                return this.collection.insert(result).then(resolve).catch(reject);
            })
        })    
    }
    
    find (params){
        return new Promise( (resolve, reject) => {
            return this.apply_middleweres('find')(params).then( (result) => {
                return this.collection.find(result).then(resolve).catch(console.log)
            })
        })
    } 
    findOne (params){
        return new Promise( (resolve, reject) => {
            return this.apply_middleweres('findOne')(params).then( (result) => {
                return this.collection.findOne(result).then(resolve)
            })
        })
    }
    remove (params){
        return new Promise( (resolve, reject) => {
            return this.apply_middleweres('remove')(params).then( (result) => {
                return this.collection.remove(result).then(resolve)
            })
        })
    }
}
