import express from 'express'

const app = express()

app.listen(process.env.PORT || 3333, () => console.info(`Server running at http://localhost:${process.env.PORT || 3333}`))
