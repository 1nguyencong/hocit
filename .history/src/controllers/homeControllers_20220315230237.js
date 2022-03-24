 
import db from '../models/index'
import CRUDservices from '../services/CRUDservices'
let getHomePage = async (req, res) => {
    try{
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch(e) {
        console.log(e) 
    }
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDservices.createNewUser(req.body)
    console.log(message)
    return res.send('đã gửi pass lên server ')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservices.getAllUser();
    console.log('------------')
    console.log(data)
    console.log('------------')
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId) {
        let userData = await CRUDservices.getUserInfoById(userId);
 
        return res.render('editCRUD.ejs', {
            user: userData,
        })
    } else {
        return res.send('hello from edit page')
    }    
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDservices.updateUserData(data);
    return res.send('update none')
  
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
}