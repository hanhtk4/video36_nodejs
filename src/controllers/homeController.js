// npm install --save bcrypt@5.0.1 --> hask password 
// chú ý: khi kết nối dữ liệu cần sử dụng hàm 'async' , 'await' để đảm bảo connect là lấy đc data mới làm tiếp cv
import db from '../models/index'; // index chứa các model
import CRUDservice from '../services/CRUDService';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        // console.log('----------show data-----------------');
        // console.log(JSON.stringify(data));
        // console.log('---------------------------');

        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        });
    }
    catch (e) {
        console.log(e)
    }
}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    // req.boy giup lay toan bo thong tin user input tu form giao dien
    // console.log(req.body);
    await CRUDservice.createNewUser(req.body)
    // let message = await CRUDservice.createNewUser(req.body)
    // truyen thong tin user nhap vao sang model CRUDService de them hoac so sanh voi database
    return res.send('post crud from server');
    console.log(message);
}
let DisplayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    // console.log('---------------------------');
    // console.log(data);
    // console.log('---------------------------');
    return res.render("displayCRUD.ejs", {
        dataTable: data,
    });

}

let getEditCRUD = async (req, res) => {

    // lấy Id trên bảng dữ liệu của dòng khi click vào
    let userId = req.query.id;
    if (userId) {
        // hàm lấy toàn bộ thông tin trên bảng dữ liệu của ID chọn sửa hoặcxóa
        // console.log(userId);
        let userData = await CRUDservice.getUserInforById(userId);
        // console.log("----------------------");
        // console.log(userData);
        // console.log("----------------------");
        return res.render('editCRUD.ejs', {
            userData: userData
        });
    }
    else
        return res.send("User is not found, không có ID  ")
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers1 = await CRUDservice.updateUserData(data);
    return res.render("displayCRUD.ejs", {
        dataTable: allUsers1,
    });
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    console.log('______________ID_________')
    console.log(id)
    if (id) {
        await CRUDservice.deleteUserById(id);
        return res.send('Deleted user')
    }
    else {
        return res.send('user lost found')
    }

}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    DisplayGetCRUD: DisplayGetCRUD,

    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}
