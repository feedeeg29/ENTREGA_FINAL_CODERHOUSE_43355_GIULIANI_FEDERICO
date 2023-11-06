import { Router } from "express";
const fsrouter = Router();
import Actions from "../Controllers/controller.fs.js";
import { developmentLogger } from "../utils/Logger/logger.js";

const admin = true;

//Traer un producto por ID
fsrouter.get("productos/:id", (req, res) => {
    const { id } = req.params;
    Actions.getOne(id)
        .then(product => {
            res.status(200).json(product);
        }).catch(err => {
            console.error(err)
        })
});
// Traer todos los productos
fsrouter.get("/productos", (req, res) => {
    Actions.getAll().then(data => {
        res.status(200).send(data)
    }).catch(err => {
        developmentLogger.fatal(err)
    })
})

// Agregar un producto
fsrouter.post("/productos", (req, res) => {
    res.send(admin ? Actions.add(req.body) : { error: 403, description: 'método POST en ruta /productos solo disponible para administradores' });
});

// Actualizar un producto segun su ID
fsrouter.put("/productos/:id", (req, res) => {
    const { id } = req.params
    const body = req.body
    res.send(admin ? Actions.update(id, body) : { error: 403, description: 'método PUT en ruta /productos solo disponible para administradores' });
});

// Eliminar un producto
fsrouter.delete("/productos/:id", (req, res) => {
    res.send(admin ? Actions.delete(req.params.id) : { error: 403, description: `<div><h1>Error 403</h1><h2> Forbidden<h2></div>` });
})

// Crear un cart y devolver el ID
fsrouter.post("/carrito", (req, res) => {
    const prods = req.body;
    res.send(Actions.createCart(prods));
})

// Eliminar un cart por ID
fsrouter.delete("/carrito/:id", (req, res) => {
    res.send(Actions.deleteCart(req.params.id));
})

// Traer todos los productos de un cart
fsrouter.get("/carrito/:id/productos", (req, res) => {
    Actions.getCartProducts(req.params.id)
        .then(data => { res.status(200).send(data) }).catch(err => { console.log(err) })
})

// Agregar un producto a un cart por ID
fsrouter.post("/carrito/:id/productos", (req, res) => {
    const { id } = req.params;
    const productId = req.body.id;
    res.send(Actions.addToCart(id, productId));
})

// Eliminar un producto de un cart por ID
fsrouter.delete("/carrito/:id/productos/:id_prod", (req, res) => {
    const { id, id_prod } = req.params;
    res.send(Actions.deleteFromCart(id, id_prod));
})

























//export del modulo
export default fsrouter;