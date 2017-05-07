const Posts = module.exports = ( generateController, { Post } ) => {
    return generateController(Post, {
        hello: ({res}) => {
            res.send("Hello world")
            res.end()
        }
    })
}
