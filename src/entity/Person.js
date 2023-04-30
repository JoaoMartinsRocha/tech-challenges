const AppDataSource = require('./datasource/datasource')
const Person = require('./entity/Person.js')

//const Role = require('./entity/Role.js')

const fs = require("fs");
const { marked } = require('marked');
const express = require('express')
const app = express()
const port = 3000

const personRepository = AppDataSource.getRepository(Person)

//const roleRepository = AppDataSource.getRepository(Role)

app.get('/', (req, res) => {
    let readme = './README.md';
    let output = fs.readFileSync(readme, 'utf8');
    
    res.send(marked(output.toString()));
})

app.get('/persons', async (req, res) => {
    let persons = await personRepository.find({
        relations: {
            roles: true
        }   
    })
    res.send(persons)
})

// Still can't figure out how to create a new entry annd add it to person 
app.post('/persons', (req, res) => {
    console.log("Post request called") // this works
    //let persons = await personRepository.find({
    //     relations: {
    //         roles: true
    //     }   
    // })
    // res.send(persons)
    
})

// Get for roles, doesn't work --> Error: Server returned nothing (no headers, no data)
// app.get('/roles', async (req, res) => {
//     let roles = await roleRepository.find({
//         relations: {
//             roles: true
//         }   
//     })
//     res.send(roles)
// })

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

