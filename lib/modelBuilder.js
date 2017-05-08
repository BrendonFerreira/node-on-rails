class ModelBuilder {

    constructor(database={}){
        this.database = database
    }

    setName(name) {
        this.collection = this.database.getCollection(name);
    }

}