import { sequelize } from './database';
import express from 'express';
import { Server } from 'typescript-rest';


// Port 
const port = 8080;





new Promise((res, rej) => {
 console.log('Connecting to Database');
 sequelize.authenticate();
 sequelize.sync({force: true});
 res();
}).then(() => {
 console.log('Database connected');
})







const app: express.Application = express();

//rest 
const apis = express.Router();


Server.loadServices(apis, './routes/*');
app.use('apis', apis);


app.listen(port, () => {
Server.buildServices(app)
 console.log(`Server is running. Listening on port ${port}`);
})