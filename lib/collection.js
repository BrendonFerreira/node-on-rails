
const Query = require('./query')

module.exports = class Collection {
    constructor(){
        this.items = [];
    }
    find (query) {
        return new Promise( (resolve, reject) => {
            resolve( this.items.filter( new Query(query) ) )
        })
    }
    findOne (query) {
        return new Promise( (resolve, reject) => {
            resolve( this.items.find( new Query(query) ) )
        })
    }
    remove (query) {
        return new Promise( (resolve, reject) => {
            let before = this.items.length
            this.items = this.items.filter( new Query(query) )
            resolve( { n: before - this.items.length } )
        })
    }
    insert (data) {
        return new Promise( (resolve, reject) => {
            this.items.push(data);
            resolve( data )
        })
    }
    count () {
        return new Promise( resolve => {
            resolve( this.items.length )
        })
    }
}