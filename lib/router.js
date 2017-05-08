
const parseRoute = ( root, path ) => `/${root}${path}`;

class RouterBuilder  {
    constructor (controller){
        this.controller = controller
    }
    build() {
        return (req,res,next) => {
            const activatedController = this.controller({ req, next, res, send: res.send, json: res.json, end: res.end, params : req.params, body: req.body }) 
            if( activatedController instanceof Promise ){
                // Then, whe have to resolve that
                activatedController.then( (response) => res.json(response) || res.end() )
                    .catch( (response) => res.end(response) )
            }
        }
    }
}

module.exports = class Router {
    
    constructor(routeActioner, controller, routerConfigurer){
        // Default routes for some controller
        this.routeActioner = routeActioner;
        this.controller = controller
        return routerConfigurer( name => {
            this.routeActioner.get( parseRoute(name, '/'), new RouterBuilder(this.controller['index']).build() )
            this.routeActioner.get( parseRoute(name, '/:id'), new RouterBuilder(this.controller['consult']).build() )
            this.routeActioner.post( parseRoute(name, '/'), new RouterBuilder(this.controller['create']).build() )
            this.routeActioner.put( parseRoute(name, '/:id'), new RouterBuilder(this.controller['update']).build() )
            this.routeActioner.delete( parseRoute(name, '/:id'), new RouterBuilder(this.controller['remove']).build() )
            return this.create(name)
        })
    }

    create(name) {
        return {
            get : ( path, functionName ) => {
                this.routeActioner.get( parseRoute(name, path) , new RouterBuilder( this.controller[functionName] ).build() )
            },
            post : ( path, functionName ) => {
                this.routeActioner.post( parseRoute(name, path) , new RouterBuilder( this.controller[functionName] ).build() )
            },
            put : ( path, functionName ) => {
                this.routeActioner.put( parseRoute(name, path) , new RouterBuilder( this.controller[functionName] ).build() )
            },
            delete : ( path, functionName ) => {
                this.routeActioner.delete( parseRoute(name, path) , new RouterBuilder( this.controller[functionName] ).build() )
            },
            create : () => {
                return this.routeActioner
            }
        }
    }
}
