

let handleLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    return res.status(200).json({
        yourEmail: email,
        yourPassword: password
    })
}

module.exports = {
    handleLogin: handleLogin
}