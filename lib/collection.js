function Query( query={} ) {
    return (item) => {
        for( let index in query ){
            if( query[index] ){
                if( item[index] != query[index]){
                    return false
                }
            }
        }
        return true;
    }
}

function Collection(){
    this.items = [];
    
    this._find = (query) => {
        console.log(query)
        return new Promise( (resolve, reject) => {
            resolve( this.items.filter( new Query(query) ) )
        })
    }
    this._findOne = (query) => {
        return new Promise( (resolve, reject) => {
            resolve( this.items.find( new Query(query) ) )
        })
    }
    this._remove = (query) => {
        return new Promise( (resolve, reject) => {
            let before = this.items.length
            this.items = this.items.filter( new Query(query) )
            resolve( { n: before - this.items.length } )
        })
    }
    this._insert = (data) => {
        return new Promise( (resolve, reject) => {
            this.items.push(data);
            resolve( data )
        })
    }
    this._count = () => {
        return new Promise( resolve => {
            resolve( this.items.length )
        })
    }
    return this;
}

module.exports = Collection