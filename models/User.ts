//user.model.ts
import { Table, Column, Model, Length, IsEmail, Unique } from 'sequelize-typescript';

import 'crypto';
import { createHash } from 'crypto';
import { UniqueConstraintError } from 'sequelize';



export const UserN = 'Not a model';
export const NUser = 'Not a model';

@Table
export class User extends Model<User> {



  @Length({ min: 3, max: 20 })
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







  public static async login(data: any){
      return await User.findOne({
        where:{
          username: data.username,
          password: this.hashPassword(data.password)
        }
      }).then(user=>{
        console.log(user)
        if (!user){
          console.log("Login failed " + user);
          return{
            "code": 404,
            "description": "Username or password incorrect!"
          };
        }

        console.log("Success!");
        return{
          "code": 200,
          "description": "User found",
          "user":{
            "username": user.username,
            "lastname": user.lastname,
            "firstname": user.firstname,
            "email": user.email,
          }
        }

      });
    
      
  }




  private static  hashPassword(password: any): string{
    let hash = createHash('sha256');
    return hash.update(password, 'utf8').digest("base64");

  }


  // TODO: Better
  public static async createUser(data: any){
    return await User.create({
      username: data.username,
      password: this.hashPassword(data.password),
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname
    }).then(user=>{
      return user.save();
    }).then(user=>{
      console.log(`New User: ${user.username}`);
      return {
        "code": 200,
        "description": "Registration Successful!"
      }
    })
    .catch(error=>{
      let code = 406;
      let desc = "";
      switch(error.name){
        case 'SequelizeUniqueConstraintError':
          desc = `${error.fields} already taken`
          break;
        default: 
          code= 400,
          desc = "Something went wrong!"; 
          break;
      }
      let value = {
        "code": code,
        "description": desc
      };
      console.error(value, 
        error.name
      )
      return value;
      
    });

  }

}
