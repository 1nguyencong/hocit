import db from '../models/index'
import bcrypt from 'bcryptjs';



const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            let hashPasswordFrombcrypt = await hashUesrPassword(data.password);

        } catch(e) {
            reject(e)
        }
    })

}
let hashUesrPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
}