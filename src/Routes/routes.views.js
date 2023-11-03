import { Router } from 'express';
import ActionsMongo from '../Controllers/controller.mongo.js';
import { developmentLogger, productionLogger } from '../utils/Logger/logger.js'
import { authRole } from '../utils/role/role.middleware.js';

const viewsRoutes = Router();

// Ruta base
viewsRoutes.get('/', (req, res) => {
    res.render('home');
});

// Rutas de productos
viewsRoutes.get('/products', ActionsMongo.renderAllProducts);
viewsRoutes.get('/product/:id', ActionsMongo.getOne);
viewsRoutes.get('/addproducts', (req, res) => {
    res.render('addProduct');
});

// Rutas de carritos
viewsRoutes.get('/carts', authRole(["admin", "superadmin", "premiumUser"]), ActionsMongo.renderAllCarts);
viewsRoutes.get('/cart/:id', ActionsMongo.getOneCart);

// Rutas de autenticación
viewsRoutes.get('/login', (req, res) => {
    res.render('login');
});
viewsRoutes.get('/register', (req, res) => {
    res.render('register');
});
viewsRoutes.get('/profile', (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
});

viewsRoutes.get('/superuser', authRole("superadmin"), (req, res) => {
    res.render('superuser')
})
//Ruta Unicamente para el desaf[io de Loggers// Eliminar despu[es]
viewsRoutes.get('/loggerTest', authRole(["admin", "superadmin"]), (req, res) => {
    developmentLogger.debug('Prueba de debug');
    developmentLogger.http('Prueba de HTTP.');
    developmentLogger.info('Prueba de información.');
    developmentLogger.warning('prueba de advertencia.');
    developmentLogger.error('prueba de error.');
    developmentLogger.fatal('prueba de fatal.');

    res.send('Logs registrados. Verifica la consola o el archivo "errors.log" en producción.');
});


export default viewsRoutes