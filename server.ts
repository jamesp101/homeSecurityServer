import { sequelize } from './database';
import express from 'express';
import { Server } from 'typescript-rest';

import { Devices } from './models/Devices';
import { User } from './models/User';

// Port 
const port = 8080;





new Promise((res, rej) => {
    console.log('Connecting to Database');
    sequelize.authenticate();
    sequelize.sync({ force: true });
    res();
}).then(() => {
    console.log('Database connected');

}).then(() => {
    User.createUser({
        username: 'user123',
        password: 'password123',
        email: 'jms@yahoo.com',
        firstname: 'james',
        lastname: 'paul',
    });

    Devices.build({
        deviceId: 'CAM-013',
        alias: 'CAMERA-1',
        status: 1,
        userId: 1
    })

}).catch((err)=>{
    console.error(`Database failed: ${err}`);
});



const app: express.Application = express();

//rest 
const apis = express.Router();


Server.loadServices(apis, './routes/*');
app.use('apis', apis);


app.listen(port, () => {
    Server.buildServices(app)
    console.log(`Server is running. Listening on port ${port}`);
})
