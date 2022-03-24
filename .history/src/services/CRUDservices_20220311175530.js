import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    let hashPasswordFrombcrypt = await hashUesrPassword(data.password);
    console.log('data from services')

    console.log(data)
    console.log(hashPasswordFrombcrypt)
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