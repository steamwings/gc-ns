import { IParty, IPartyRef } from '../party/party.model';

export interface IUserRef extends IPartyRef {
    
}

export interface IUser extends IParty {
    // TODO add thumbnail
}

export class LoginFormUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export class UserProfile {
    bio: string;
    domains: string;
}

export class UserFull {
    id: string;
    name: string;
    dob: Date;
    phone: string;
    email: string;
    token: string;
}
