import fs from 'fs';
import Contenedor from '../../Manager/Container/container.js';


let contenedor = new Contenedor('./public/products.json');

async function getAllProducts() {
    try {
        const fileExists = fs.existsSync('./public/products.json');
        console.log(fileExists)
        if (!fileExists) {
            await fs.promises.writeFile('./public/products.json', '[]', 'utf-8');
        }
        const data = await fs.promises.readFile('./public/products.json', 'utf-8')
        const array = JSON.parse(data);
        return array;
    }
    catch (err) {
        throw new Error(err)
    }
}

async function getProduct(id) {
    try {
        const fileExists = fs.existsSync('./public/products.json');
        console.log(fileExists)
        if (!fileExists) {
            await fs.promises.writeFile('./public/products.json', '[]', 'utf-8');
        }
        const data = await fs.promises.readFile('./public/products.json', 'utf-8')
        const array = JSON.parse(data);
        return array.find(product => product.id == id) ?? "Producto no encontrado"
    } catch (err) {
        throw new Error(err);
    }
}

const addProduct = (product) => {
    const prod = {
        name: product.name ?? '',
        timestamp: Date.now(),
        description: product.description ?? '',
        code: product.code ?? '',
        photo: product.photo ?? '',
        price: product.price ?? 0,
        stock: product.stock ?? 0,
        seller: product.seller ?? "Fede"
    }
    contenedor.save(prod)
}

async function updateProduct(id, newContent) {
    try {
        const fileExists = fs.existsSync('./public/products.json', "utf-8");
        console.log(fileExists)
        if (!fileExists) {
            await fs.promises.writeFile('./public/products.json', '[]', 'utf-8');
        }
        const product = await getProduct(parseInt(id))
        console.log(product)
        if ((product.id == id) && (product.id != null)) {
            product.name = newContent.name ?? product.name
            product.timestamp = Date.now()
            product.description = newContent.description ?? product.description
            product.code = newContent.code ?? product.code
            product.photo = newContent.photo ?? product.photo
            product.price = newContent.price ?? product.price
            product.stock = newContent.stock ?? product.stock
            product.id = parseInt(id)
            product.seller = newContent.seller ?? product.seller
            contenedor.update(product)
            return product
        } else {
            return 'Producto no encontrado'
        }
    } catch (err) {
        throw new Error(err)
    }
}

async function deleteProduct(id) {
    const fileExists = fs.existsSync('./public/products.json', "utf-8");
    console.log(fileExists)
    if (!fileExists) {
        await fs.promises.writeFile('./public/products.json', '[]', 'utf-8');
    }
    const product = await getProduct(parseInt(id))
    if ((product.id == id) && (product.id != null)) {
        contenedor.delete(id)
        return 'Producto eliminado'
    } else {
        return 'Producto no encontrado'
    }
}
const products = { getAllProducts, getProduct, addProduct, updateProduct, deleteProduct }
export default products