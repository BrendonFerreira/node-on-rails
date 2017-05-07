


const User = module.exports = ( createModel, {Post} ) => {
    const model = createModel('user')
    model.define_schema({    
        name: String,
        age: Number
    }) // Will be filtered
    model.has_many(Post)
    return model;
}
