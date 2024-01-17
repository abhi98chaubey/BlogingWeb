import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;
// create contructor so that data only get when we call
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method for login 
                return this.login({email, password});
            } else {

                // if account not created then return
               return  userAccount;
            }
        } catch (error) {
          //  throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
          //  throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService



// import conf from '../conf/conf'

// import {client, ID, Account} from "appwrite"

// export class AuthService {
//     client=new client();
//     Account;

//     constructor(){
//         this.client
//         .setEndpoint(conf.appwriteUrl)
//         .setProject(conf.appwriteProjectId);
//         this.Account=new Account(this.client);
//     }

//     async createAccount({email,passward,name}){
//         try {
//             const createAccou= await this.Account.create(ID.unique(),email,passward,name);
//             if(createAccou){
//                 return this.login({email,passward});

//             }else{
//                 return createAccou;
//             }
//         } catch (error) {
//             console.log("createAccountError"+ error);
//         }
//     }
//     async login({email,passward}){
//         try {
            
//             return await this.Account.createEmailSession(email,passward);
//         } catch (error) {
//             console.log("login"+ error);
//         }
//     }

//     async getUser(){
//         try {
//             return await this.Account.get();
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     async logOut(){
//         try {
            
//             return this.Account.deleteSessions();
//         } catch (error) {
//             console.log("logout"+error);
//         }
//     }

// }

// const authservice=new AuthService();

// export default authservice;