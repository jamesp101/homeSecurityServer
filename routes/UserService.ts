import { Path, GET, PathParam, POST, PUT, QueryParam } from "typescript-rest";

import {User } from '../models/User';
import { Device } from "../models/Device";

@Path('/login')
export class Login {

    @POST
    getLogin(login: any) {
        return User.login(login);
    }

}

@Path('/register')
export class Register {

    @POST
    register(data: any): Promise<any> {
        console.log(data);
        return User.createUser(data);
    }
}



@Path('/user')
export class UserConfig{

    @GET
    userDetails(@QueryParam('id') id: string,){
        return User.getUserInfo(id);
    }

    // @GET
    // allUser(){
    //     return User.findAll()
    // }

}

@Path('/devices')
export class Devices{

    @GET
    getDevices(@QueryParam('user')id: string){
        return Device.getDevicesFromUser(id)
    }


/*     @GET
    getDevice(@QueryParam('id') id: string){
        return Device.getDevicesFromUser(id)
    } */

    @Path(':id')
    @PUT
    updateDevice(@QueryParam('id') id: string, data: any){
        return Device.updateDevice(id,data)
    }
    

}
@Path('/devce')
export class DevceInfo{
    @GET
    getDevice(@QueryParam('id') id: string){
        return Device.getDevice(id)
    } 

} 