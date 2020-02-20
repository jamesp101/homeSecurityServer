import { Table, Model, Column,  } from "sequelize-typescript";


@Table
export class Event extends Model<Event> {

    @Column
    name!: string;

    @Column
    createdDate!: Date;

    @Column
    updatedDate!: Date;




}
