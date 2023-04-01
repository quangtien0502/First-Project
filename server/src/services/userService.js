import db from "../models/index"
import bcrypt from 'bcryptjs';


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {

                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                })

                if (!user) {
                    resolve("Your email isn't exist in Database")
                }
                //compare user password
                if (user) {
                    let checkPassword = await bcrypt.compare(password, user.password)
                    if (!checkPassword) {
                        resolve("Your password is wrong")
                    }
                    if (checkPassword) {

                        userData = user
                        delete userData.password
                        userData.errCode = 0
                        userData.errMessage = "Dm Dung roi"
                        //resolve(userData)

                    }
                }

            }
            if (!isExist) {
                userData.errCode = 1;
                userData.errMessage = `Your email isn't exist`
                //resolve(userData)
            }
            //console.log(isExist)
            resolve(userData)

        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })

            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin
}