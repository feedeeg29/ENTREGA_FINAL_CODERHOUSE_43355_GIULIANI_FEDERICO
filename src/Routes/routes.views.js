import { Router } from 'express';
import ActionsMongo from '../Controllers/controller.mongo.js';
import { developmentLogger, productionLogger } from '../utils/Logger/logger.js'
import { authRole } from '../utils/role/role.middleware.js';

const viewsRoutes = Router();

// Ruta base
viewsRoutes.get('/', (req, res) => {
    res.render('home', { user: req.session.user });
});

// Rutas de productos
viewsRoutes.get('/products', ActionsMongo.renderAllProducts);
viewsRoutes.get('/product/:id', ActionsMongo.renderOne);
viewsRoutes.get('/addproducts', (req, res) => {
    res.render('addProduct');
});

// Rutas de carritos
viewsRoutes.get('/carts', ActionsMongo.renderAllCarts);
viewsRoutes.get('/cart/:id', ActionsMongo.getOneCart);

// Rutas de autenticación
viewsRoutes.get('/login', (req, res) => {
    res.render('login');
});
viewsRoutes.get('/register', (req, res) => {
    res.render('register');
});
viewsRoutes.get('/profile', (req, res) => {
    let user = req.session.user
    let isFreeUser = user && user.role === 'freeUser';

    res.render('profile', {
        user, isFreeUser

    });

});

viewsRoutes.get('/superuser', authRole("superadmin"), (req, res) => {
    res.render('superuser')
})
viewsRoutes.get('/premium/:email', (req, res) => {
    let user = req.session.user
    res.render('uploadDocuments', { user })
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