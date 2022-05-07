import db from "../models/index"
import bcrypt from 'bcryptjs';
import res from "express/lib/response";

const salt = bcrypt.genSaltSync(10);

let handUserleLogin = (email, password) => {    
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email','roleId', 'password','firstName', 'lastName'],
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
                    gender: data.gender,
                    roleId: data.role,
                    positionId: data.position,
                    image: data.avatar,
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
        let foundUser = await db.User.findOne({
            where: { id: userId}
        })
        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: 'nguoi dung ko ton tai'
            })
        }
        await db.User.destroy({
            where: { id: userId}
        })

        resolve({
            errCode: 0,
            Message: 'nguoi dung da bi xoa'
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'bat buoc nhap id'
                })
            }

            let user = await db.User.findOne({
                where: {id : data.id},
                raw: false
            })
            if (user) { 
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address,
                user.roleId = data.roleId,
                user.positionId = data.positionId,
                user.gender = data.gender,
                user.phonenumber = data.phoneNumber,

                await user.save()
                resolve({
                    errCode: 0,
                    errMessage: 'da thay doi thanh cong'
                })

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'user not fonud'
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing required parameters'
                })
            }
            let res = {};
            let allcode = await db.Allcode.findAll({
                where: {type: typeInput}
            });
            res.errCode = 0;
            res.data = allcode;
            resolve(res);
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handUserleLogin: handUserleLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    checkUserEmail: checkUserEmail,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
}