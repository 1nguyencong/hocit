

let getHomePage = (req, res) => {
    return res.send("hello works from controllers")
}

module.exports = {
    getHomePage: getHomePage
}