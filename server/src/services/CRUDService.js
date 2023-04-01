import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10)

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashPasswordFromBcrypt,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,

                roleId: data.roleId
            })
            resolve('Ok success')
        } catch (e) {
            reject(e)
        }
    })
    // let hashPasswordFromBcrypt = await hashUserPassword(data.password)
    // console.log(data)
    // console.log(hashPasswordFromBcrypt)
    // return hashPasswordFromBcrypt


}

let hashUserPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }

    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            })
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}
let findOne = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: { id: id },
                raw: true
            })
            resolve(user)
        }
        catch (e) {
            reject(e)
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id
                }
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                await user.save();
                let allUsers = await db.User.findAll()
                resolve(allUsers);
            } else {
                resolve()
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteUserById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data }
            })
            if (user) {
                await user.destroy()
                resolve()
            } else {
                resolve()
            }

            resolve()
        } catch (e) {
            reject(e)
        }

    })

}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    findOne: findOne,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById

}