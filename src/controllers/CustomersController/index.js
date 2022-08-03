const Customers = require('../../models/Customer')

async function insertCustomer(req, res){

    const {user_id,name,rg,cpf,zipCode,street,district,city,state,number,phone_number} = req.body;

    if(!user_id){
        res.status(422).json({
            status: 'warning',
            message: 'User id is required'
        })
        return
    }

    if(!name){
        res.status(422).json({
            status: 'warning',
            message: 'Customer name  is required'
        })
        return
    }

    if(!rg){
        res.status(422).json({
            status: 'warning',
            message: 'Customer rg  is required'
        })
        return
    }

    if(!cpf){
        res.status(422).json({
            status: 'warning',
            message: 'Customer cpf  is required'
        })
        return
    }

    if(!zipCode){
        res.status(422).json({
            status: 'warning',
            message: 'Customer zip-code  is required'
        })
        return
    }

    if(!street){
        res.status(422).json({
            status: 'warning',
            message: 'Customer street  is required'
        })
        return
    }

    if(!district){
        res.status(422).json({
            status: 'warning',
            message: 'Customer district  is required'
        })
        return
    }

    if(!city){
        res.status(422).json({
            status: 'warning',
            message: 'Customer city  is required'
        })
        return
    }

    if(!state){
        res.status(422).json({
            status: 'warning',
            message: 'Customer state  is required'
        })
        return
    }

    if(!number){
        res.status(422).json({
            status: 'warning',
            message: 'Customer number  is required'
        })
        return
    }

    if(!phone_number){
        res.status(422).json({
            status: 'warning',
            message: 'Customer phone number  is required'
        })
        return
    }

    const chkCustomerExists = await Customers.findOne({user_id: user_id})
    if(chkCustomerExists){
        res.status(422).json({
            status: 'error',
            message: 'This customer already exist'
        })
        return
    }

    let customer = { user_id,name,rg,cpf,zipCode,street,district,city,state,number,phone_number }

    try{

        await Customers.create(customer)

        res.status(201).json({
            status: 'success',
            message: 'New customer was inserted'
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

async function selectCustomers(req,res){

    try{

        const users = await Customers.find();

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

async function selectCustomer(req,res){

    const {id} = req.params;

    try{

        const customer = await Customers.findOne({_id: id});

        if(!customer){
            res.status(424).json({
                status: 'warning',
                message: 'Customer was not found',
                data: {}
            })
            return
        }

        res.status(200).json({
            status: 'success',
            data: customer
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

async function updateCustomer(req,res){
    
    const customerId = req.params.id

    const {user_id,name,rg,cpf,zipCode,street,district,city,state,number,phone_number} = req.body;

    const customer = { user_id,name,rg,cpf,zipCode,street,district,city,state,number,phone_number }

    try{

        const updatedCustomer = await Customers.updateOne({_id: customerId}, customer)

        res.status(200).json({
            status: 'success',
            message: 'Customer was update with success',
            customer: [{ 
                        id: customerId,
                        user_id: user_id,
                        name: name,
                        rg : rg,
                        cpf:cpf,
                        zipCode:zipCode,
                        street:street,
                        district:district,
                        city: city,
                        state: state,
                        number: number,
                        phone_number:phone_number 
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

async function deleteCustomer(req,res){
    
    const customerId = req.params.id

    const customer = { 
                        id: 'anonymized data',
                        name: 'anonymized data',
                        rg : 'xxxxxxxxx',
                        cpf: 'xxxxxxxxxxx',
                        zipCode:'anonymized data',
                        street:'anonymized data',
                        district:'anonymized data',
                        city: 'anonymized data',
                        state: 'xx',
                        number: '00',
                        phone_number:'xxxxxxxxxxx',
                    }
            
    try{

        const updatedCustomer = await Customers.updateOne({_id: customerId}, customer)

        res.status(200).json({
            status: 'success',
            message: 'User was deleted with success',
            user: [{ id: customerId }]
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
    insertCustomer, 
    selectCustomers, 
    selectCustomer, 
    updateCustomer, 
    deleteCustomer 
}