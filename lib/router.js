function Router (nativeRouter, routesConfigurator, controller){

    const parseRoute = ( root, path ) => `/${root}${path}`;
    const routeActioner = nativeRouter();

    return routesConfigurator( (name)=> {

        const createRequestListenerForController = (fn) => {
            return (req, res, next) => {
                const activatedController = fn({ req, next, res, send: res.send, json: res.json, end: res.end, params : req.params, body: req.body }) 
                
                if( activatedController instanceof Promise ){
                    // Then, whe have to resolve that
                    activatedController
                        .then( (response) => res.json(response) || res.end() )
                        .catch( (response) => res.end(response) )
                }
            }
        }

        // Default routes for some controller
        routeActioner.get( parseRoute(name, '/'), createRequestListenerForController(controller['index']) )
        routeActioner.get( parseRoute(name, '/:id'), createRequestListenerForController(controller['consult']) )
        routeActioner.post( parseRoute(name, '/'), createRequestListenerForController(controller['create']) )
        routeActioner.put( parseRoute(name, '/:id'), createRequestListenerForController(controller['update']) )
        routeActioner.delete( parseRoute(name, '/:id'), createRequestListenerForController(controller['remove']) )

        return {
            get : ( path, functionName ) => {
                routeActioner.get( parseRoute(name, path) , createRequestListenerForController( controller[functionName] ) )
            },
            post : ( path, functionName ) => {
                routeActioner.post( parseRoute(name, path) , createRequestListenerForController( controller[functionName] ) )
            },
            put : ( path, functionName ) => {
                routeActioner.put( parseRoute(name, path) , createRequestListenerForController( controller[functionName] ) )
            },
            delete : ( path, functionName ) => {
                routeActioner.delete( parseRoute(name, path) , createRequestListenerForController( controller[functionName] ) )
            },
            create : () => {
                return routeActioner;
            }
        }
    })
}

module.exports = Router