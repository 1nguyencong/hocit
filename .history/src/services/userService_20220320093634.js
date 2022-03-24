import db from "../models/index"
import bcrypt from 'bcryptjs';


let handUserleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email)
            if (isExist) {

                // bcrypt.compareSync(myPlaintextPassword, hash);
                resolve()
            } else {
                userData.errCode = 1;
                userData.errMessage = `your's Email isn't exist in your system`
                resolve(userData)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let compareUserPassword = () => {
    return new Promise(async (resolve, reject) => {
        try {

        } catch (e) {
            reject(e)
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
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
    handUserleLogin: handUserleLogin,
}