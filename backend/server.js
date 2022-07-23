// on importe le module "http" de node
const http = require('http');

// on importe le module créé "app" qui est "express" depuis le dossier backend (./app)
const app = require('./app');

// création d'une fonction "normalizePort" qui renverra un PORT valide (qu'il soit fourni sous forme de string ou number)
const normalizePort = valid => {
    // transforme le port un nombre entier 
    const port = parseInt(valid, 10);
    if (isNaN(port)) {
        return valid;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

// on déclare le port à utiliser
const port = normalizePort(process.env.PORT || 3000);
// on indique à "app" sur quel PORT elle doit tourner
app.set('port', port)

// la fonction "errorHandler"  recherche les différentes erreurs et les gère de manière appropriée. 
// Elle est ensuite enregistrée dans le serveur.
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

// un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

// server par défaut 3000 sinon "process.env.PORT".
server.listen(port); 