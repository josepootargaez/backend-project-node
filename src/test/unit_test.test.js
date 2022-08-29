const {validateEmail}=require('../helpers/validations') 
const app = require("../index")
const request = require("supertest");
describe("Validations users",()=>{
    test('validate email user ',async  () => {
        const email=await validateEmail('jose@hotmail.com');
        expect(email).toBe(true)
    });

})

describe("Get /Users/:id",()=>{
    test('should respond with status 200',async  () => {
        const id=1;
       const response = await request(app).get(`/users/${id}`).send();
       expect(response.statusCode).toBe(200)
    });
    
    test('should respond in the body an array',async  () => {
        const id=1;
       const response = await request(app).get(`/users/${id}`).send();
       expect(response.body).toBeInstanceOf(Array);
    });
})

describe("post /Users",()=>{
    test('should respond with status 200',async  () => {
        const payload ={
            name:"eduardo",
            email:"eduardo@hotmail.com"
        }
       const response = await request(app).post("/users").send(payload);
       expect(response.statusCode).toBe(200)
    });
})

describe("Get /Users",()=>{
    test('should response with array',async  () => {
       const response = await request(app).get("/users").send();
       expect(response.body).toBeInstanceOf(Array);
    });
    
})

describe("delete /Users",()=>{
    test('should response with array',async  () => {
        const id = 1;
       const response = await request(app).delete(`/users/${id}`).send();
       expect(response.statusCode).toBe(204)
    });
    
})