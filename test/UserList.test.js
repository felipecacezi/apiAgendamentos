const request = require('supertest')
const app = require('../src/server')


test("Testing users list", async ()=>{

    const response = request(app)
                        .get('/users')

    
    expect(res.body).toEqual()
    

})

test("Testing new user", async ()=>{

    const response = request(app)
                        .post('/user')
                        .send()

    
    expect(res.body).toEqual()
    

})