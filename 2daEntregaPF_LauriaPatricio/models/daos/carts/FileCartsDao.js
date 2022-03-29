const FileContainer =require('../../containers/FileContainer')

class FileCartsDao extends FileContainer{
    constructor(){
        super("db/file/carts.txt")
    }
}

module.exports=FileCartsDao;