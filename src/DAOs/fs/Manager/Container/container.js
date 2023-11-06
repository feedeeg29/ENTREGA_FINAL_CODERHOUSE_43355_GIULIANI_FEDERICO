import fs from 'fs/promises';
import { developmentLogger } from '../../../../utils/Logger/logger.js'

class Contenedor {
    constructor(file) {
        this.file = file;
    }
    async save(object) {
        try {
            if (fs.existsSync(this.file)) {
                const data = await fs.promises.readFile(this.file);
                const array = JSON.parse(data);
                const ID = array.length === 0 ? 1 : array[array.length - 1].id + 1;
                object.id = ID

                array.push(object);
                await fs.promises.writeFile(this.file, JSON.stringify(array, null, 2));
                developmentLogger.info('Se ha guardado el objeto con el id: ' + object.id);
            } else {
                object.id = 1;
                await fs.promises.writeFile(this.file, JSON.stringify([object]));
                developmentLogger.info('Se ha guardado el objeto con el id: ' + object.id);
            }
        } catch (err) {
            throw new Error(err);
        }
    }
    /*     async update(product) {
            try {
                if (fs.access(this.file)) {
                    const data = await fs.promises.readFile(this.file);
                    const array = JSON.parse(data);
                    const index = product.id - 1;
                    array[index] = product;
                    await fs.promises.writeFile(this.file, JSON.stringify(array, null, 2));
                    developmentLogger.info('Se ha actualizado el objeto con el id: ' + product.id);
                } else {
                    throw new Error('No existe el archivo');
                }
            } catch (err) {
                throw new Error(err);
            }
        } */
    async update(product) {
        try {
            const data = await fs.readFile(this.file);
            const array = JSON.parse(data);
            const index = array.findIndex(item => item.id === product.id);
            if (index !== -1) {
                array[index] = product;
                await fs.writeFile(this.file, JSON.stringify(array, null, 2));
                developmentLogger.info('Se ha actualizado el objeto con el id: ' + product.id);
            } else {
                throw new Error('Producto no encontrado en el archivo');
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    async delete(id) {
        try {
            if (fs.access(this.file)) {
                const data = await fs.promises.readFile(this.file);
                const array = JSON.parse(data);
                const deleteishion = array.filter(product => product.id != id);
                await fs.promises.writeFile(this.file, JSON.stringify(deleteishion, null, 2));
                developmentLogger.info('Se ha eliminado el objeto con el id: ' + id);
            } else {
                throw new Error('No existe el archivo');
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default Contenedor;