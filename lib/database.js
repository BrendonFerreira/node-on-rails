const Collection = require('./collection')

const DataBase = {
    collections: {},
    createCollection : function(collectionName){
        this.collections[collectionName] = new Collection()
        return this.collections[collectionName]
    },
    getCollection : function(collectionName){
        return this.collections[collectionName]
    }
}


module.exports = DataBase