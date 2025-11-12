import express, { urlencoded } from 'express'
import config from './config/config.js'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swaggerOptions.js'
import personasRoutes from './routes/personasRoutes.js'
import errors from './utils/errors.js'

const app = express()

//Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(urlencoded({ extended: true }))
app.use(express.json())

// Configuration
app.set('port', config.app.port)

// Root endpoint: mensaje de estado y enlace a la documentación
app.get('/', (req, res) => {
	const host = req.get('host')
	const protocol = req.protocol
	res.json({
		message: 'API corriendo',
		documentation: `${protocol}://${host}/api-docs`
	})
})

//Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/personas', personasRoutes)
app.use(errors)

export default app
