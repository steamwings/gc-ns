import { IRef } from "./ref.model";
import { IParty, IPartyRef } from "./party.model";

export class LoginFormUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IUserRef extends IPartyRef {
    
}

export interface IUser extends IParty {
    // TODO add thumbnail
}

