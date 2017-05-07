module.exports = (User, Permission) => {
    return (req, res, next) => {
        next(true);
    }
}
