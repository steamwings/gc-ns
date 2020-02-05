import { IRef } from "./ref.model";

export class LoginFormUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IIdentityRef extends IRef {
    // TODO add thumbnail
}

