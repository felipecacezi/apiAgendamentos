const Schedule = require('../../models/Schedule')

async function insertSchedule(req, res){

    const { customer_id, schedule_status, date, notes } = req.body;

    if(!customer_id){
        res.status(422).json({
            status: 'warning',
            message: 'Customer id is required'
        })
        return
    }

    if(!schedule_status){
        res.status(422).json({
            status: 'warning',
            message: 'Schedule status is required'
        })
        return
    }

    if(!date){
        res.status(422).json({
            status: 'warning',
            message: 'Date is required'
        })
        return
    }

    let dateSumOnehour = new Date(date);
    let maxHour = new Date(date);

    maxHour.setHours(dateSumOnehour.getHours()+1)

    const testScheduleDateExist = await Schedule.find({        
        date:{
            $gte: new Date(dateSumOnehour),
            $lte: new Date(maxHour),
        }        
    })

    if( testScheduleDateExist.length > 0 ){
        res.status(400).json({
            status: 'error',
            message: 'The selected date is not avaliable'
        })
        return
    }

    let schedule = { customer_id, schedule_status, date: new Date(date), notes }

    try{

        await Schedule.create(schedule)

        res.status(201).json({
            status: 'success',
            message: 'New schedule was inserted'
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

async function selectSchedules(req,res){

    try{

        const schedules = await Schedule.find();

        res.status(200).json({
            status: 'success',
            data: schedules
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

async function selectSchedule(req,res){

    const {id} = req.params;

    try{

        const schedule = await Schedule.findOne({_id: id});

        if(!schedule){
            res.status(424).json({
                status: 'warning',
                message: 'Schedule was not found',
                data: {}
            })
            return
        }

        res.status(200).json({
            status: 'success',
            data: schedule
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

async function updateSchedule(req,res){
    
    const schedule_id = req.params.id

    const {customer_id, schedule_status, date, notes} = req.body;

    const schedule = { customer_id, schedule_status, date: new Date(date), notes }

    let dateSumOnehour = new Date(date);
    let maxHour = new Date(date);

    maxHour.setHours(dateSumOnehour.getHours()+1)

    const testScheduleDateExist = await Schedule.find({        
        date:{
            $gte: new Date(dateSumOnehour),
            $lte: new Date(maxHour),
        }        
    })

    if( testScheduleDateExist.length > 0 ){
        res.status(400).json({
            status: 'error',
            message: 'The selected date is not avaliable'
        })
        return
    }

    try{

        const updatedSchedule = await Schedule.updateOne({_id: schedule_id}, schedule)

        res.status(200).json({
            status: 'success',
            message: 'Schedule was update with success',
            schedule: [{ 
                        customer_id: customer_id, 
                        schedule_status: schedule_status, 
                        date: date, 
                        notes: notes 
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

async function deleteSchedule(req,res){
    
    const schedule_id = req.params.id

    const schedule = { schedule_status: 'd' }
            
    try{

        const updated_schedule = await Schedule.updateOne({_id: schedule_id}, schedule)

        res.status(200).json({
            status: 'success',
            message: 'Schedule was deleted with success',
            user: [{ id: schedule_id }]
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
    insertSchedule, 
    selectSchedules, 
    selectSchedule, 
    updateSchedule, 
    deleteSchedule 
}