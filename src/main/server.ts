import { app } from './config/app'

app.listen(process.env.PORT || 3333, () => console.info(`Server running at http://localhost:${process.env.PORT || 3333}`))
