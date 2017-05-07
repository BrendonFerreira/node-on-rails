const Post = module.exports = (createRouter) => {
    const router = createRouter('post')
    router.get('/say/hello', 'hello')
    return router.create();
}
