const RequestHasPermission = require('../helpers/request_has_permission')

module.exports = ( createModel, {} ) => {
    const model = createModel('post')
    
    model.define_schema({
        title: String,
        content: String,
        creatorId: Number 
    })
    return model;
}
