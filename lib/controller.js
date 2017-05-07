function Controller(controller, Models) {
    const getDefaultCrudFunctions = (Model, ToExtend={}) => {
        return Object.assign({
            index : (...d) => {
                console.log(d)
                return Model.find()
            },
            consult: ({ params: { id } }) => Model.findOne( {id} ),
            create: ({ body }) => Model.insert(body),
            update: ({ params : { id }, body }) => Model.update(id, body),
            remove: ({ params: { id } }) => Model.remove(id)
        }, ToExtend)
    }

    return controller( getDefaultCrudFunctions , Models );
}

module.exports = Controller;