// 35: Tao controler su ly nguoi dung dang nhap

import userService from "../services/userService";
let handleLogin = async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "missing inputs Parameter!"
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    // console.log(userData);

    // // check email nguoi dung exist
    // // so sanh password
    // // return userInfor
    // // access_tokenL JWT 
    return res.status(200).json({
        // errCode: 0,
        // messega: 'đã truyền email và password',
        // youremail: email,
        // yourpassword: password,

        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })

}

module.exports = { handleLogin: handleLogin }
