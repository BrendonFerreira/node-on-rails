const ModelCreator = require('./model')

function ModelInjector(fn, db) {

    const creatorFunction = (name) => {
        return ModelCreator( db.createCollection(name) );
    }

    return fn( creatorFunction, db )
}

module.exports = ModelInjector
