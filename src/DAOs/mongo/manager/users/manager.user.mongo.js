import userModel from '../../models/users/model.users.js';

class UserManager {
    static async getUsers() {
        try {
            const users = await userModel.find();
            console.log(users)
            return users;
        } catch (err) {
            throw new Error('Error al obtener todos los usuarios: ' + err.message);
        }
    }
    static async createUser(userData) {
        try {
            const user = await userModel.create(userData);
            return user;
        } catch (err) {
            throw new Error('Error al crear el usuario: ' + err.message);
        }
    }
    static async getUserById(id) {
        try {
            const user = await userModel.findById(id);
            return user;
        } catch (err) {
            throw new Error('Error al obtener el usuario por su id: ' + err.message);
        }
    }
    static async getUserByEmailAndPassword(email, password) {
        try {
            const user = await userModel.findOne({ email, password });
            return user;
        } catch (err) {
            throw new Error('Error al obtener el usuario por sus credenciales: ' + err.message);
        }
    }
    static async getUserByEmail(email) {
        try {
            const user = await userModel.findOne({ email });
            return user;
        } catch (err) {
            throw new Error('Error al obtener el usuario por su email: ' + err.message);
        }
    }


    static async updateUserByEmail(email, userData) {
        try {
            const updatedUser = await userModel.findOneAndUpdate({ email }, userData, { new: true });
            return updatedUser;
        } catch (err) {
            throw new Error('Error al actualizar el usuario: ' + err.message);
        }
    }


    static async deleteUser(email) {
        try {
            const deletedUser = await userModel.findOneAndDelete({ email });
            return deletedUser;
        } catch (err) {
            throw new Error('Error al eliminar el usuario: ' + err.message);
        }
    }


    static async deleteUserById(id) {
        try {
            const deletedUser = await userModel.findOneAndDelete({ id });
            if (!deletedUser) { console.log("mi puta madre") }
            return deletedUser;
        } catch (err) {
            throw new Error('Error al eliminar el usuario: ' + err.message);
        }
    }
}

export default UserManager
