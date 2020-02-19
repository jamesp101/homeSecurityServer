import { Path, GET, PathParam, POST } from "typescript-rest";

import {User } from '../models/User';

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

    @Path(':id')
    @GET
    userDetails(@PathParam('id') id: string,){
        return User.getUserInfo(id);
    }

}
