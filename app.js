import express from "express"
import cors from 'cors';

import {dirname, join} from "path"
import {fileURLToPath} from "url"
import {PORT} from "./config.js"

import isAuthenticated from './middleware/user.middleware.js'
import errorRuta from './middleware/errorRuta.middleware.js'
import middleware from './middleware/seguridad.middleware.js'
import connectdb from './database.js'
import fileUpload from "express-fileupload"

import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'
import indexRoutes from './routes/index.routes.js'
import supervisorRoutes from './routes/supervisor.routes.js'
import cartRoutes from './routes/cart.routes.js'

import "./config/passport.js"

// Initializations
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", PORT);
app.set("views", join(__dirname, "views"));
app.use(express.json());
app.use(fileUpload({
  createParentPath: true, 
  useTempFiles: true,            // Usar archivos temporales en vez de la memoria
  tempFileDir: '/tmp/',          // Carpeta temporal para archivos
  limits: { fileSize: 16 * 1024 * 1024 }, // Tamaño máximo de archivo (16 MB)
  abortOnLimit: true             // Cancelar si se supera el límite de tamaño
}));
// middlewares ajuste base de datos y seguridad del sitio web
middleware(app);
connectdb(app);
app.use(cors());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});



// routes
app.use(userRoutes)
app.use(indexRoutes)
app.use(supervisorRoutes)

//middleware para proteger las siguientes rutas
app.use(isAuthenticated);
app.use(adminRoutes)
app.use(cartRoutes)

// static files
app.use(express.static(join(__dirname, "public")));




//middleware de error
app.use(errorRuta);



export default app;