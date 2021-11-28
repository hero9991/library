import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import bookRoutes from './routes/books.js'

const app = express()

app.use(cors())

app.use('/books', bookRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`)))
    .catch(error => console.log(error.message))