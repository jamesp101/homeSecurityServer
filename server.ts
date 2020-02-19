import { sequelize } from './database';
import express from 'express';
import { Server } from 'typescript-rest';

import { Devices } from './models/Devices';
import { User } from './models/User';

import SocketIO from 'socket.io';
import * as http from 'http';


// Port 
const port = 8080;




(async ()=>{
    try{
        console.log('Connecting to Database');
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Database connected');
    }catch(err){
        console.error(`Database failed: ${err}`);
    }
})


const app: express.Application = express();
const apis = express.Router();






let ht = http.createServer(app);

let io = SocketIO(ht);
io.on('connection', ()=>{
    io.emit('event', {hello: "world"})
});


Server.loadServices(apis, './routes/*');
app.use('apis', apis);

app.listen(port, () => {
    Server.buildServices(app)
    console.log(`Server is running. Listening on port ${port}`);
})
