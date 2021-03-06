const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth.routes'))



const PORT = config.get('port')||5000

async function start() {

    try {

        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        app.listen(PORT, ()=> {
            console.log(`Server started at port ${PORT}`)
        })

    }
    catch (e) {
        console.log("Что-то пошло не так", e.message)
        process.exit(1)
    }
}

start()

