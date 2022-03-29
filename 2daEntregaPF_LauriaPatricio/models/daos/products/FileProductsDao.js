const FileContainer =require('../../containers/FileContainer')

class FileProductsDao extends FileContainer{
    constructor(){
        super("db/file/products.txt")
    }
}

module.exports=FileProductsDao;