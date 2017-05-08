const ModelCreator = require('./model')

module.exports = function ModelInjector(fn, collection) {

    const creatorFunction = (name) => {
        return new ModelCreator( collection );
    }

    return fn( creatorFunction, collection )
}
