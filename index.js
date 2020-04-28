const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')

const app = express()

// Init Middleware
//app.use(logger)

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Setting static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/users', require('./routes/api/users'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`))
