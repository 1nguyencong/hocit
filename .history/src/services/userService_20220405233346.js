import db from "../models/index"
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let handUserleLogin = (email, password) => {    
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email','roleId', 'password'],
                    where: {email: email},
                    raw: true
                })
                if (user) {                
                let check = await bcrypt.compareSync(password, user.password);
                if (check) {
                    userData.errCode = 0,
                    userData.errMessage = 'chinh xac',
                    delete user.password,
                    userData.user = user;
                } else {
                    userData.errCode = 3,
                    userData.errMessage = 'mat khau khong chinh xac'
                }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `your's Email isn't exist in your system`
            }
            resolve(userData)
        } catch (e) {
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



let checkUserEmail = (userEmail) => {
    return new Promise( async (resolve, reject) => {
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

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email); 
            if(check === true) {
                resolve ({
                    errCode: 1,
                    errMessage: 'email cua ban da duoc su dung, lam on sang email khac'
                })
            } else {
                let hashPasswordFrombcrypt = await hashUesrPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFrombcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phoneNumber,
                    gender: data.gender === '1'? true : false,
                    roleId: data.role,
                })
                resolve({
                    errCode: 0,
                    message: 'Ok'
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser= (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId}
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: 'nguoi dung ko ton tai'
            })
        }
        console.log(user)

        await user.destroy();

        resolve({
            errCode: 0,
            Message: 'nguoi dung da bi xoa'
        })
    })
}
module.exports = {
    handUserleLogin: handUserleLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    checkUserEmail: checkUserEmail,
    deleteUser: deleteUser,
}