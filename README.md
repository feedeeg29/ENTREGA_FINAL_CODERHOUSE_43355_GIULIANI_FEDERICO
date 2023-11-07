Descripción
Este proyecto es una aplicación de gestión de usuarios, productos y carritos. Utiliza tecnologías como Node.js, Express, MongoDB y Passport para la autenticación. También incorpora un sistema de logs utilizando Winston.

Requisitos previos
Asegúrate de tener Node.js instalado en tu sistema. Si no lo tienes, puedes descargarlo e instalarlo desde nodejs.org.
Se requiere tener una base de datos MongoDB disponible. Si no la tienes, puedes instalarla localmente o utilizar un servicio en la nube como MongoDB Atlas.

Requisitos previos
Asegúrate de tener Node.js instalado en tu sistema. Si no lo tienes, puedes descargarlo e instalarlo desde nodejs.org.
Se requiere tener una base de datos MongoDB disponible. Si no la tienes, puedes instalarla localmente o utilizar un servicio en la nube como MongoDB Atlas.

<h1>Instalación</h1>
<h2>1_Clona el repositorio desde GitHub:</h2>
    git clone https://github.com/feedeeg29/ENTREGA_FINAL_CODERHOUSE_43355_GIULIANI_FEDERICO.git
<h2>2_Instala las dependencias utilizando npm:</h2>
    npm install 
<h2>3_Crea un archivo .env en la raíz del proyecto y configura las variables de entorno necesarias. Ejemplo:</h2>

##serverConfig

    PORT=8080
    
    PERSISTENCE=mongo

##Mongoconfig

    MONGO_CONFIG='TuConfigMongo'
    
    DB_USER=TuUser
    
    DB_PASSWORD=TuPassword
    
    HOST=TuHost
    
    DB_NAME=TuDBName
    
    SECRET='Tu_Secreto'

##github 
    
    CLIENT_ID="Tu_ID"
    
    CLIENT_SECRET="TuSecreto"
    
    GIT_CALLBACK_URL="Tu_CALLBACK"
    
<h1>Uso</h1>
<h2>1_Inicia la aplicación en el entorno de desarrollo con:</h2>
    npm run start:dev
<h2>2_Abre tu navegador y visita http://localhost:"tupuerto" para acceder a la aplicación.</h2>

<h1>Test</h1>
<h2>Para ejecutar los tests de la aplicación:</h2>
    <p>npm run cartTest</p>
    <p>npm run sessionTest</p>
    <p>npm run productsTest</p>


<h1>Proyecto Desarrollado unicamente con fines educativos</h1>    
<h2>Desarrollado con las siguientes herramientas</h2>
<a href="https://www.npmjs.com/package/@faker-js/faker">
    <p>@faker-js/faker</p>
</a>

<a href="https://www.npmjs.com/package/bcrypt">
    <p>bcrypt</p>
</a>

<a href="https://www.npmjs.com/package/chai-http">
    <p>chai-http</p>
</a>

<a href="https://www.npmjs.com/package/connect-mongo">
    <p>connect-mongo</p>
</a>

<a href="https://www.npmjs.com/package/cookie-parser">
    <p>cookie-parser</p>
</a>

<a href="https://www.npmjs.com/package/dotenv">
    <p>dotenv</p>
</a>

<a href="https://www.npmjs.com/package/express">
    <p>express</p>
</a>

<a href="https://www.npmjs.com/package/express-handlebars">
    <p>express-handlebars</p>
</a>

<a href="https://www.npmjs.com/package/express-session">
    <p>express-session</p>
</a>

<a href="https://www.npmjs.com/package/jsonwebtoken">
    <p>jsonwebtoken</p>
</a>

<a href="https://www.npmjs.com/package/mongoose">
    <p>mongoose</p>
</a>

<a href="https://www.npmjs.com/package/mongoose-paginate-v2">
    <p>mongoose-paginate-v2</p>
</a>

<a href="https://www.npmjs.com/package/multer">
    <p>multer</p>
</a>

<a href="https://www.npmjs.com/package/nodemon">
    <p>nodemon</p>
</a>

<a href="https://www.npmjs.com/package/passport">
    <p>passport</p>
</a>

<a href="https://www.npmjs.com/package/passport-github2">
    <p>passport-github2</p>
</a>

<a href="https://www.npmjs.com/package/routes">
    <p>routes</p>
</a>

<a href="https://www.npmjs.com/package/socket.io">
    <p>socket.io</p>
</a>

<a href="https://www.npmjs.com/package/swagger-jsdoc">
    <p>swagger-jsdoc</p>
</a>

<a href="https://www.npmjs.com/package/swagger-ui-express">
    <p>swagger-ui-express</p>
</a>

<a href="https://www.npmjs.com/package/sweetalert2">
    <p>sweetalert2</p>
</a>

<a href="https://www.npmjs.com/package/winston">
    <p>winston</p>
</a>
