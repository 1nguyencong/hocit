 
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
    await CRUDservices.createNewUser(req.body)
    return res.send('tai lieu ')
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
}