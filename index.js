

const Model = require('./lib/modelInjector')
const Controller = require("./lib/controller")
const Router = require('./lib/router')

const Models = {
    // Listing my models
    Post: new Model( require('./app/models/post'), require('./lib/database') ),
    User: new Model( require('./app/models/user'), require('./lib/database') )
}


const UsersController = new Controller( require('./app/controllers/users'), Models);
const PostsController = new Controller( require('./app/controllers/posts'), Models);

UsersController.create({body: {name: "Silva World da silva", age: "21"}}).then( (response) =>
    UsersController.create({body: {name: "Hello World da silva", age: "23"}}).then( (response) =>
        UsersController.create({body: {name: "Pereira World da silva", age: "18"}}).then( (response) =>
            UsersController.create({body: {name: "World da silva", age: "30"}}).then( (response) =>
                UsersController.create({body: {name: "Tux World da silva", age: "19"}}).then( (response) =>
                    UsersController.create({body: {name: "World da Silva World da silva", age: "29"}}).then( (response) =>
                        UsersController.create({body: {name: "XPTO World da silva", age: "31"}}).then( (response) =>
                            PostsController.create({body: {title: "Hello World", content: "This is my first post"}}).then( (response) =>
                                UsersController.index()
                            )
                        )
                    )
                )
            )
        )
    )
).catch(console.log)

const express = require('express')
const app = express()
app.use( new Router(express.Router, require('./app/routes/users'), UsersController)  )
app.use( new Router(express.Router, require('./app/routes/posts'), PostsController)  )
app.listen(3000)
