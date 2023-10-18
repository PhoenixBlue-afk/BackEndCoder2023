import { Server } from 'socket.io'
import __dirname from './utils.js';
import express from 'express';
import handlebars from 'express-handlebars';
import viewRouter from './routes/views.router.js'

const app = express()
const PORT = 9090;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');


app.use(express.static(__dirname + '/public'));



const httpServer = app.listen(PORT, () => {
    console.log("Servidor escuchando por el puerto: " + PORT);
});


app.use('/', viewRouter)


const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado!');

    socket.on('mensaje', data => {
        console.log(data);
    })

    socket.emit('msg_02', 'Mesaje enviado desde el back!!')

    socket.broadcast.emit("evento_para_todos_excepto_socket_actual", "Este evento es para todos los sockets, menos el socket desde que se emitió el mensaje!");

    socketServer.emit("evento_para_todos", "Evento para todos los Sockets!");

    socket.on("message1", data => {
        console.log("Recibiendo texto:");
        console.log(data);
        socketServer.emit('log', data);
    });


    const logs = [];
    socket.on("message2", data => {
        logs.push({ socketid: socket.id, message: data })
        socketServer.emit('log', { logs });
    });


})

