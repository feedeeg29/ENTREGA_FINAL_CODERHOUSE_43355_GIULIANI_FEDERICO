import { Router } from "express";
import ActionsMongo from '../Controllers/controller.mongo.js'
import { developmentLogger } from "../utils/Logger/logger.js";
import { authRole } from "../utils/role/role.middleware.js";
const userMongoRoutes = Router();

userMongoRoutes.get("/", ActionsMongo.getAllUsers);
userMongoRoutes.post("/register", ActionsMongo.registerUser);

// actualizar un usuario -- email requerido
userMongoRoutes.put("/:email", ActionsMongo.updateUser);
userMongoRoutes.put("/premium", ActionsMongo.updateUser)
// Iniciar sesion
userMongoRoutes.post("/login", ActionsMongo.loginUser);

// Cerrar sesion
userMongoRoutes.post("/logout", ActionsMongo.logoutUser);

//Eliminar un usurio -- Email requerido
userMongoRoutes.delete("/:email", ActionsMongo.deleteUser);
userMongoRoutes.delete("/:uid", ActionsMongo.deleteUserByID)
// Autenticación con GitHub
userMongoRoutes.get("/github", ActionsMongo.authenticateGithub);

userMongoRoutes.get("/githubcallback", ActionsMongo.githubCallback);

// Obtener usuario actual
userMongoRoutes.get("/current", ActionsMongo.getCurrentUser);
userMongoRoutes.get('/ver-sesion', (req, res) => {
    if (req.session) {
        // Accede a los datos de la sesión
        const sessionData = req.session;

        // Imprime los datos de la sesión en la consola
        developmentLogger.debug(sessionData);

        // Accede a propiedades específicas de la sesión, por ejemplo, el ID del usuario
        const userId = req.session.user_id;

        // Haz lo que necesites con los datos de la sesión
        res.send('Datos de sesión vistos en la consola');
    } else {
        res.send('No hay datos de sesión disponibles');
        developmentLogger.warning("No hay datos de sesion disponible")
    }
});

userMongoRoutes.post('/:uid/documents', ActionsMongo.uploadDocuments);

export default userMongoRoutes;