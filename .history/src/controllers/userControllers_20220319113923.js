

let handleLogin = (req, res) => {
    return res.status(200).json({
        message: 'hello word'
    })
}

module.exports = {
    handleLogin: handleLogin
}