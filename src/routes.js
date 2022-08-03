const { Router } = require('express')

const UserController     = require('./controllers/UserController');
const CustomerController = require('./controllers/CustomersController');
const ScheduleController = require('./controllers/ScheduleController');

const routes = Router()

// users
routes.get('/users', UserController.selectUsers)
routes.get('/user/:id', UserController.selectUser)
routes.post('/user', UserController.insertUser)
routes.patch('/user/:id', UserController.updateUser)
routes.delete('/user/:id', UserController.deleteUser)

// auth

// customers
routes.post('/customer', CustomerController.insertCustomer)
routes.get('/customers', CustomerController.selectCustomers)
routes.get('/customer/:id', CustomerController.selectCustomer)
routes.patch('/customer/:id', CustomerController.updateCustomer)
routes.delete('/customer/:id', CustomerController.deleteCustomer)

// schedules
routes.post('/schedule', ScheduleController.insertSchedule)
routes.get('/schedules', ScheduleController.selectSchedules)
routes.get('/schedule/:id', ScheduleController.selectSchedule)
routes.patch('/schedule/:id', ScheduleController.updateSchedule)
routes.delete('/schedule/:id', ScheduleController.deleteSchedule)

module.exports = routes