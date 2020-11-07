import { IParty, IPartyRef } from '../party/party.model';

export interface IUserRef extends IPartyRef {
    
}

export interface IUser extends IParty {
    // TODO add thumbnail
}

export class UserProfile {
    bio: string = "";
    domains: string = "";
}

export class UserDetail {
    id: string = null;
    name: string = "";
    dob: Date = null;
    phone: string = "";
    email: string = "";
}

export class LoginFormUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

/**
 * Received from Login/Register
 */
export class UserFull extends UserDetail {
    id: string;
    name: string;
    dob: Date;
    phone: string;
    email: string;
    token: string;
    profile: UserProfile;
}
