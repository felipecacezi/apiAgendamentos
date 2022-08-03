const User    = require('../../models/User')
const bcrypt   = require('bcrypt')
const jwt      = require('jsonwebtoken') 

async function insertUser(req,res){

    const { name, email, password, phone, type, status } = req.body

    if(!name){
        res.status(422).json({
            status: 'warning',
            message: 'Name is required'
        })
        return
    }

    if(!email){
        res.status(422).json({
            status: 'warning',
            message: 'E-mail is required'
        })
        return
    }

    if(!password){
        res.status(422).json({
            status: 'warning',
            message: 'Password is required'
        })
        return
    }

    if(!phone){
        res.status(422).json({
            status: 'warning',
            message: 'Phone is required'
        })
        return
    }

    if(!type){
        res.status(422).json({
            status: 'warning',
            message: 'Type is required'
        })
        return
    }

    if(!status){
        res.status(422).json({
            status: 'warning',
            message: 'Status is required'
        })
        return
    }

    const chkUserExists = await User.findOne({email: email})
    if(chkUserExists){
        res.status(422).json({
            status: 'error',
            message: 'This email already exists, please choose another email or reset your password'
        })
        return
    }

    const salt = await bcrypt.genSalt(12)

    const passwordHash = await bcrypt.hash(password, salt)

    const user = { name, email, password:passwordHash, phone, type, status }

    try{

        await User.create(user)

        res.status(201).json({
            status: 'success',
            message: 'New user was inserted'
        })
        return

    } catch(error){
        res.status(500).json({
            status: 'error',
            message: 'There was an error with your request, please contact support'
        })
        return
    }

}

async function selectUsers(req,res){

    try{

        const users = await User.find();

        res.status(200).json({
            status: 'success',
            data: users
        })
        return

    } catch(error){
        res.status(500).json({
            status: 'error',
            message: 'There was an error with your request, please contact support'
        })
        return
    }

}

async function selectUser(req,res){
    
    const {id} = req.params;

    try{

        const users = await User.findOne({_id: id});

        if(!users){
            res.status(424).json({
                status: 'warning',
                message: 'User was not found',
                data: {}
            })
            return
        }

        res.status(200).json({
            status: 'success',
            data: users
        })
        return

    } catch(error){
        res.status(500).json({
            status: 'error',
            message: 'There was an error with your request, please contact support'
        })
        return
    }

}

async function updateUser(req,res){
    
    const userId = req.params.id

    const { name, email, password, phone, type } = req.body

    const user = { name, email, password, phone, type }

    try{

        const updatedUser = await User.updateOne({_id: userId}, user)

        res.status(200).json({
            status: 'success',
            message: 'User was update with success',
            user: [{ 
                        id: userId,
                        name: name, 
                        email: email, 
                        password: password, 
                        phone: phone, 
                        type: type 
                    }]
        })
        return

    } catch(error) {
        res.status(500).json({
            status: 'error',
            message: 'There was an error with your request, please contact support'
        })
        return
    }

}

async function deleteUser(req,res){
    
    const userId = req.params.id

    const user = { 
                    name : 'anonymized data', 
                    email: 'anonymized@data.com', 
                    password : '000000', 
                    phone: '999999999', 
                    type: '0',
                    status: 'i' 
                }
    
    try{

        const updatedUser = await User.updateOne({_id: userId}, user)

        res.status(200).json({
            status: 'success',
            message: 'User was deleted with success',
            user: [{ id: userId }]
        })
        return

    } catch(error) {
        res.status(500).json({
            status: 'error',
            message: 'There was an error with your request, please contact support'
        })
        return
    }

}

module.exports = { 
    insertUser,
    selectUsers,
    selectUser,
    updateUser,
    deleteUser 
}