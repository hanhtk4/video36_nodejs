// 35.
import db from '../models/index';
import bcrypt, { hash } from 'bcryptjs';

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne(
                {
                    where: { email: userEmail }
                }
            )
            // console.log(user)
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

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
                });
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "ok";
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "wrong password";
                    }

                } else {
                    userData.errCode = 2;
                    userData.errMessage = "user is not found"
                }
            }
            else {
                // return loi
                userData.errCode = 1;
                userData.errMessage = `your email is not Exits in our system. Please try again`;
            }
            resolve(userData);
        } catch (e) {
            reject(e)
        }
    })
}
let compareUserPassword = () => {
    return new Promise((resolve, reject) => {
        try {

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
}
