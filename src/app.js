import express from 'express'
import employesRoutes from './routes/employes.routes.js'
import registerRoutes from './routes/register.routes.js'
//import loginRoutes from './routes/login.routes.js'
import indexRoutes from './routes/index.routes.js'
import { errorHandler, errorRuta } from './middleware/errorHandler.js'

const app = express()

app.use(express.json())
app.use(indexRoutes)
app.use(employesRoutes)
app.use(registerRoutes)
app.use(errorRuta)
app.use(errorHandler)

export default app