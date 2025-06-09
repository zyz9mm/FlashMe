const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const corsOptions = {
    origin: '*', // Allow all origins
    credentials: true, // Allow credentials
    optionSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions))

const port = 4000
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
