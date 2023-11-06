import { Router } from 'express';
import ActionsMongo from '../Controllers/controller.mongo.js'
import { generateProduct } from '../utils/Mock/mock.products.js';
import { developmentLogger } from '../utils/Logger/logger.js';
import { authRole } from '../utils/role/role.middleware.js'

const mnrouter = Router();


//Endpoint para traer todos los productos 
mnrouter.get('/', async (req, res) => {
    try {
        const products = await ActionsMongo.getAll(req, req.query)
        res.status(200).json({ status: 200, data: products })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})


//Endpoint para traer un producto -- ID requerido
mnrouter.get("/:id", ActionsMongo.getOne)



//Endpoint para crear un producto
mnrouter.post("/", ActionsMongo.createProduct)


//Endpoint para actualizar un producto -- ID requerido
mnrouter.put("/:id", ActionsMongo.updateProduct)



//Endpoint para eliminar un producto -- ID requerido
mnrouter.delete("/:id", authRole(["admin", "superadmin"]), async (req, res) => {
    const { id } = req.params;
    await ActionsMongo.deleteProduct(id)
    res.send(204)
})

mnrouter.get("/mocks", authRole(["admin", "superadmin"]), (req, res) => {
    try {
        const products = [];
        for (let i = 0; i < 100; i++) {
            products.push(generateProduct());
        }
        developmentLogger.debug(products)
        res.send({ status: 200 })
    } catch (error) {
        res.status(500).json({ status: 500, err: "Error al generar productos" });
        developmentLogger.fatal(error)
    }
});






//Export Modulo
export default mnrouter 