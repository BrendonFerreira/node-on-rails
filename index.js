

const Model = require('./lib/modelInjector')
const Controller = require("./lib/controller")
const Router = require('./lib/router')

const Collection = require('./lib/collection')
const Models = {
    // Listing my models
    // Could be : Post: new Model( require('./app/models/post'), db.getCollection('posts') )
    Post: new Model( require('./app/models/post'), new Collection() /* Memory DB */ ),
    User: new Model( require('./app/models/user'), new Collection() /* Memory DB */ )
}


const UsersController = new Controller( require('./app/controllers/users'), Models);
const PostsController = new Controller( require('./app/controllers/posts'), Models);

const express = require('express')
const app = express()
app.use( new Router( express.Router(), UsersController, require('./app/routes/users') ) )
app.use( new Router( express.Router(), PostsController, require('./app/routes/posts') ) )
app.listen(3000)
