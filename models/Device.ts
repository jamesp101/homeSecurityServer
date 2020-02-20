
//user.model.ts
import { Table, Column, Model, Length, IsEmail, Unique, ForeignKey } from 'sequelize-typescript';


import {User} from './User';
import { where } from 'sequelize/types';

@Table
export class Device extends Model<Device> {


    @Column
    name!: string;

    @Column
    alias!: string;
    
    @Unique
    @Column
    deviceId!: string;

    
    @Column
    streamUrl!:string;

    @Column
    status: number = 0;


    @ForeignKey(()=> User)
    @Column
    userId!: number;



    public static updateDevice(ids: string, data: any){
        return Device
            .update(
                {
                    name: data.name,
                    alias: data.alias,
                    status: data.status,
                    userId: data.userId

                },
                {
                    where:{
                        id: ids
                    }
                }).then(device=>{
                    return {
                        code: 200,
                        description: 'Device updated',
                        device: device
                    }
                }).catch(err=>{
                    return{
                        code: 400,
                        description: 'Something went wrong',
                        error: err
                    }
                });

    }


    public static getDevice(ids: string){
        return Device.findOne(
            {where:{id: ids}}
        ).then(device=>{
            return {
                code: '200',
                description: 'Device',
                device: device
            }
        }).catch(err=>{
            return {
                code: '404',
                description: 'Something went wrong',
                error: err
            }
        })
    }

    public static getDevicesFromUser(user: string){
        return Device.findAll({where:{
            userId: user
        }}).then(device=>{
            return {
                code: '200',
                description: 'Devices',
                device: device
            }
        }).catch(err=>{
            return{
                code: '404',
                description: 'Something went wrong',
                error: err
            }
        })
    }
} 


