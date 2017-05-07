const express = require('express')

const Application = module.exports = ( function() {

    const router = express.Router()
    return {
        main_page(req, res) {
            res.json({message: 'Hello World'})
            res.end()
        },
        getRouter() {
            return express.Router()
        },
        use(p) {
            return router.use(p)
        },
        start(port){
            const app = express()
            app.use(router)
            app.listen(port)
        }
    }
    

})()