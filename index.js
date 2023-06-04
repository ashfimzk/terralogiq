const express = require('express');
const app = express()
const cors = require('cors')
app.use(express.json()) // body Parser : mengambil data yang dikirimkan oleh client melalui body
app.use(cors())


const PORT = 5001

app.get('/', (req, res) => {
    res.status(201).send(`<h1>Welcome to Ashfi API/h1>`)
})

//import Router
const { userRouter } = require('./router')


app.use('/user', userRouter)


app.listen(PORT, () => console.log(`API Running on Port ${PORT}`))