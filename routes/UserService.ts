import { Path, GET, PathParam, POST } from "typescript-rest";
import sha256, { hash, HMAC } from 'fast-sha256';


import { User } from '../models/User';
import { IsEmail } from "sequelize-typescript";
import from from 'tweetnacl-util';

class UserJson {
    username!: string;
    password!: string;
}

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
        console.log("Register");
        return User.createUser(data);
    }
}
