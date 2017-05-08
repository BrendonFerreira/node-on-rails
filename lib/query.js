module.exports = function Query( query={} ) {
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
