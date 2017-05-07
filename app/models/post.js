const RequestHasPermission = require('../helpers/request_has_permission')

module.exports = ( createModel, {} ) => {
    const model = createModel('post')
    
    model.define_schema({
        title: String,
        content: String,
        creatorId: Number 
    })

    model.define_middlewere('insert', (object, next) => {
        // Send to socket or something
        console.log("Creating new POST!!!", object.title)
        next(object)
    })

    return model;
}
