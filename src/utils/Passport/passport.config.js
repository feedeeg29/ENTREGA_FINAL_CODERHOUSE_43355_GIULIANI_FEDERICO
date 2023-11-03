import passport from "passport";
import { clientGitID, clientSecret, clientGitURL } from '../dotenv/dotenv.config.js'
import GitHubStrategy from "passport-github2";
import { createHash } from "../utils.js";
import ActionsMongo from "../../Controllers/controller.mongo.js";





const initializePassport = () => {
    passport.use(
        "github",
        new GitHubStrategy(
            {
                clientID: clientGitID,
                clientSecret: clientSecret,
                callbackURL: clientGitURL,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await ActionsMongo.getUserByEmail(profile._json.email);
                    if (!user) {
                        const newUser = {
                            first_name: profile._json.name.split(" ")[0],
                            last_name: profile._json.name.split(" ")[1],
                            email: profile._json.email,
                            password: createHash("")
                        };
                        const result = await ActionsMongo.createUser(newUser);
                        return done(null, result);
                    } else {
                        return done(null, user);
                    }
                } catch (error) {
                    return done("Error al obtener el usuario" + error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await ActionsMongo.getUserById(id);
        done(null, user);
    });
};

export default initializePassport;
