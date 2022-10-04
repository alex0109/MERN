import express from 'express'
import mongoose from 'mongoose'

import { registerValidation, loginValidation, postCreateValidation } from './validations.js'
import checkAuth from './utils/checkAuth.js'

import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

mongoose
.connect('mongodb+srv://reybey:qwerty0000@cluster0.q8ygltz.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
    console.log('DB is ok');
})
.catch((err) => {
    console.log('DB error', err);
})

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('H234234ello world!')
})

app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
// app.delete('/posts/:id', PostController.remove)
// app.patch('/posts/:id', PostController.update)

app.listen(4444, (error) => {
    if(error){
        return console.log(error);
    }

    console.log('Server is okey!');
})