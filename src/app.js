import express from "express"

import {dirname, join} from "path"
import {fileURLToPath} from "url"
import {PORT} from "./config.js"

import middleware from './middleware/seguridad.middleware.js'
import userRoutes from './routes/auth.routes.js'
import "./config/passport.js"

// Initializations
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", PORT);
app.set("views", join(__dirname, "views"));

// middlewares
middleware(app);
// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// routes
app.use(userRoutes);

// static files
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  return res.status(404).render("404");
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", {
    error,
  });
});

export default app;