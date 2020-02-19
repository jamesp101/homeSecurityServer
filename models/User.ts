//user.model.ts
import { Table, Column, Model, Length, IsEmail, Unique, HasMany } from 'sequelize-typescript';

import { createHash } from 'crypto';

import { UniqueConstraintError } from 'sequelize';


import { Devices } from './Devices';


@Table
export class User extends Model<User> {



    @Length({ min: 3, max: 20 })
    @Unique
    @Column
    username!: string;


    @Length({ min: 1, max: 50 })
    @Column
    public lastname!: string;

    @Length({ min: 1, max: 50 })
    @Column
    public firstname!: string;

    @Length({ min: 1, max: 50 })
    @Unique
    @IsEmail
    @Column
    public email!: string;


    @Column
    public password!: string;



    @HasMany(() => Devices)
    devices!: Devices[];

    public static async login(data: any) {
        return await User.findOne({
            where: {
                username: data.username,
                password: this.hashPassword(data.password)
            }
        }).then(usr => {
            if (!usr) throw new Error("Username or password incorrect!");

            return {
                code: 200,
                description: 'User found',
                user: {
                    usr
                }

            }
        }).catch(err => {
            return {
                code: 404,
                description: err.message
            };

        });
    }



    private static hashPassword(password: any): string {
        let hash = createHash('sha256');
        return hash.update(password, 'utf8').digest("base64");
    }

    // TODO: Better
    public static async createUser(data: any) {
        console.log(data);
        return await User.create({
            username: data.username,
            password: this.hashPassword(data.password),
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname
        }).then(user => {
            return user.save();
        }).then(user => {
            console.log(`New User: ${user.username}`);
            return {
                "code": 200,
                "description": "Registration Successful!"
            }
        }).catch(error => {
            return {
                code: 404,
                description: error.errors[0].message
            }
        });

    }

    public static async getUserInfo(id: string) {
        return await User.findOne({
            where:{id: id}
        }).then(user=>{
            if(!user) throw new Error('User not found');

            return user;
        }).catch(err=>{
            return {
                code: 404,
                description: err.message
            };
        });


    }

}
