import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import cartMongoRoutes from '../Routes/cart.mongo.routes.js';
import mnroutes from "../Routes/products.mongo.routes.js";
import fsroutes from "../Routes/routes.fs.js";
import userMongoRoutes from '../Routes/routes.session.js';
import viewsRoutes from "../Routes/routes.views.js";
import { URI, connectToDatabase } from '../db/mongo.db.js';
import { developmentLogger } from '../utils/Logger/logger.js';
import initializePassport from '../utils/Passport/passport.config.js';
import { PORT, secret } from '../utils/dotenv/dotenv.config.js';
import { specs } from '../utils/swagger/swagger.js';
import __dirname from '../utils/utils.js';



const app = express()




//middleware
app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

connectToDatabase()

app.use(session({
  store: new MongoStore({
    mongoUrl: URI,
    ttl: 720000,
  }),
  secret: secret,
  resave: false,
  saveUninitialized: false
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//handlebars config

app.engine("handlebars", handlebars.engine({ defaultLayout: 'home', extname: '.handlebars' }))
app.use(express.static(`${__dirname}/public`))
app.use(express.static(`${__dirname}/public`))
app.use(express.static(`public/errors`))
app.set("view engine", "handlebars")
app.set('views', path.join(__dirname, '..', 'views'));


//rutas para el front
app.use('/', viewsRoutes)
app.use('/products', viewsRoutes)
app.use('/addproducts', viewsRoutes)
app.use('/carts', viewsRoutes)
app.use('/products/product/:id', viewsRoutes)
app.use('/login', viewsRoutes)
app.use('/register', viewsRoutes)
app.use('/profile', viewsRoutes)

//rutas backend-only
app.use('/api/fs', fsroutes)
app.use('/api/products', mnroutes)
app.use('/api/carts', cartMongoRoutes)
app.use('/api/users', userMongoRoutes)

app.use((req, res, next) => {
  /* solo descomentar este codigo durante las pruebas
  const youtubeURL = "https://youtu.be/7aMOurgDB-o?t=60"
  res.redirect(youtubeURL)*/
  res.status(404).render("404")
})
// Server conectado exitosamente
const server = app.listen(PORT, () => developmentLogger.info(`Server running on port ${PORT}`))
// Server con error
server.on("error", (err) => {
  developmentLogger.fatal(`El servidor a tenido un error:${err}`)
})
