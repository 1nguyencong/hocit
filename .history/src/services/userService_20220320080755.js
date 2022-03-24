import db from "../models/index"

let handleLogin = (email, password) => {

}


let checkUserEmail = (userEmail) => {
    return new Promise((resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)   
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleLogin: handleLogin,
}