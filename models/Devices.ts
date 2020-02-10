
//user.model.ts
import { Table, Column, Model, Length, IsEmail, Unique, ForeignKey, BelongsTo } from 'sequelize-typescript';


import {User} from './User';

import {ErrorHandler} from '../jsonbuilder';


@Table
export class Devices extends Model<Devices> {

    @Column
    deviceId!: string;

    @Column
    alias!: string;

    @Column
    status!: number;


    @ForeignKey(()=> User)
    @Column
    userId!: number;


    @BelongsTo(()=> User)
    user!: User;


    public static createDevice(data: any){
        Devices.create({
            deviceId: data.deviceId,
            alias: data.alias,
            device: data.status,
            userId: data.user
        }).then(device=>{
            return device.save();
        }).then((device)=>{
           console.log(`New device created ${device.deviceId}`);
        }).error(error=>{
            return ErrorHandler(error);
        });
    }

    public static getDevices(data:any){
        return Devices.findAll({
            where:{
                userId: data.userId
            }
        }).then((device) => {
            return device
        }).catch((error)=>{
            console.log("Error: ${error}")
        });
    }


}
