import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
// thêm dữ liệu vào database
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email, //name của thẻ email
                password: hashPasswordFromBcrypt,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === 1 ? true : false,
                roleId: data.roleId,
            })
            resolve('ok create new user success');
            // console.log('data from services');
            // console.log(data);
            // console.log(hashPasswordFromBcrypt);
        } catch (e) {
            reject(e);
        }
    })

}

// hash dữ liệu trước khi thêm vào database
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);

        }
    })
}
// Hiển thị read dữ liệu từ database
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)

        } catch (e) {
            reject(e)
        }
    })
}

// Hàm thực hiện chức năng lấy thông tin của dòng có ID đã chọn
let getUserInforById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (user) {
                resolve(user)
            }

            else {
                resolve({})
            }

        } catch (e) {
            reject(e)

        }
    });
}
let updateUserData = (data) => {
    // console.log('-------------data-------')
    // console.log(data);
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: true
            })
            // console.log('-------------user-------')
            // console.log(user)
            if (user) {
                await db.User.update({ firstName: data.firstName, lastName: data.lastName, address: data.address }, {
                    where: { id: data.id }
                });
                let allUsers = await db.User.findAll()
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (e) {
            console.log(e);
        }
    })

}
let deleteUserById = (id) => {
    console.log('---------------ID duoc truyen sang CRUD Service--------');
    console.log(id);
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: true,
            })
            if (user) {
                console.log(user);
                await db.User.destroy({
                    where: {
                        id: id,
                        // criteria

                    }
                })

            }
            resolve()

        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInforById: getUserInforById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
} 
