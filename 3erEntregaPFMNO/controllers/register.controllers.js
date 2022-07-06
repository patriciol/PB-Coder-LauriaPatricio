const register = async (req, res, next) => {
    try {
        res.render('register')
    }
    catch (error) {
        next(error);
    }
};

module.exports = {
    register
}